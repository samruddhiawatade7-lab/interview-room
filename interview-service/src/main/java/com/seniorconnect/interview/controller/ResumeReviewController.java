package com.seniorconnect.interview.controller;

import com.seniorconnect.interview.entity.ResumeReview;
import com.seniorconnect.interview.repository.ResumeReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resume-reviews")
@RequiredArgsConstructor
public class ResumeReviewController {

    private final ResumeReviewRepository resumeReviewRepository;
    private final RabbitTemplate rabbitTemplate;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ResumeReview>> getStudentReviews(@PathVariable Long studentId) {
        return ResponseEntity.ok(resumeReviewRepository.findByStudentId(studentId));
    }

    @GetMapping("/senior/{seniorId}")
    public ResponseEntity<List<ResumeReview>> getSeniorReviews(@PathVariable Long seniorId) {
        return ResponseEntity.ok(resumeReviewRepository.findBySeniorId(seniorId));
    }

    @PostMapping
    public ResponseEntity<ResumeReview> createRequest(@RequestBody ResumeReview request) {
        request.setStatus("PENDING");
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeReviewRepository.save(request));
    }

    @PutMapping("/{id}/feedback")
    public ResponseEntity<?> submitFeedback(@PathVariable Long id, @RequestBody ResumeReview feedback) {
        ResumeReview existing = resumeReviewRepository.findById(id).orElse(null);
        if (existing == null) return ResponseEntity.notFound().build();

        existing.setFormattingScore(feedback.getFormattingScore());
        existing.setAtsScore(feedback.getAtsScore());
        existing.setSkillsScore(feedback.getSkillsScore());
        existing.setProjectsScore(feedback.getProjectsScore());
        existing.setOverallFeedback(feedback.getOverallFeedback());
        existing.setImprovements(feedback.getImprovements());
        existing.setStatus("COMPLETED");
        existing.setCompletedAt(LocalDateTime.now());

        ResumeReview saved = resumeReviewRepository.save(existing);

        try {
            rabbitTemplate.convertAndSend("seniorconnect.exchange", "resume.review.completed", Map.of(
                "eventId", "RESUME-" + saved.getId(),
                "studentId", saved.getStudentId(),
                "seniorName", saved.getSeniorName(),
                "targetRole", saved.getTargetRole()
            ));
        } catch (Exception e) {
            System.err.println("RabbitMQ notification dispatch skipped: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
    }
}
