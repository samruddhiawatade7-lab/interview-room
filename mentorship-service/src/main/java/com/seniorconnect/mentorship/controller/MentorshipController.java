package com.seniorconnect.mentorship.controller;

import com.seniorconnect.mentorship.entity.MentorshipRequest;
import com.seniorconnect.mentorship.repository.MentorshipRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mentorship")
@RequiredArgsConstructor
public class MentorshipController {

    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final RabbitTemplate rabbitTemplate;

    @PostMapping("/requests")
    public ResponseEntity<MentorshipRequest> createRequest(@RequestBody MentorshipRequest request) {
        request.setStatus("PENDING");
        MentorshipRequest saved = mentorshipRequestRepository.save(request);

        // Publish event to RabbitMQ (optional fallback handling)
        try {
            rabbitTemplate.convertAndSend("seniorconnect.exchange", "mentorship.request.created", Map.of(
                "eventId", "REQ-" + saved.getId(),
                "studentId", saved.getStudentId(),
                "seniorId", saved.getSeniorId(),
                "studentName", saved.getStudentName(),
                "purpose", saved.getPurpose()
            ));
        } catch (Exception e) {
            System.err.println("RabbitMQ notification dispatch skipped: " + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/requests/student/{studentId}")
    public ResponseEntity<List<MentorshipRequest>> getRequestsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(mentorshipRequestRepository.findByStudentId(studentId));
    }

    @GetMapping("/requests/senior/{seniorId}")
    public ResponseEntity<List<MentorshipRequest>> getRequestsBySenior(@PathVariable Long seniorId) {
        return ResponseEntity.ok(mentorshipRequestRepository.findBySeniorId(seniorId));
    }

    @PutMapping("/requests/{id}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable Long id) {
        MentorshipRequest request = mentorshipRequestRepository.findById(id).orElse(null);
        if (request == null) return ResponseEntity.notFound().build();

        request.setStatus("ACCEPTED");
        MentorshipRequest saved = mentorshipRequestRepository.save(request);

        try {
            rabbitTemplate.convertAndSend("seniorconnect.exchange", "mentorship.request.accepted", Map.of(
                "eventId", "ACC-" + saved.getId(),
                "studentId", saved.getStudentId(),
                "seniorId", saved.getSeniorId(),
                "seniorName", saved.getSeniorName()
            ));
        } catch (Exception e) {
            System.err.println("RabbitMQ notification dispatch skipped: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/requests/{id}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable Long id) {
        MentorshipRequest request = mentorshipRequestRepository.findById(id).orElse(null);
        if (request == null) return ResponseEntity.notFound().build();

        request.setStatus("REJECTED");
        MentorshipRequest saved = mentorshipRequestRepository.save(request);
        return ResponseEntity.ok(saved);
    }
}
