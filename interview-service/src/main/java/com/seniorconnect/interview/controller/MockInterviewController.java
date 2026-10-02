package com.seniorconnect.interview.controller;

import com.seniorconnect.interview.entity.MockInterview;
import com.seniorconnect.interview.repository.MockInterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mock-interviews")
@RequiredArgsConstructor
public class MockInterviewController {

    private final MockInterviewRepository mockInterviewRepository;
    private final RabbitTemplate rabbitTemplate;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<MockInterview>> getStudentMockInterviews(@PathVariable Long studentId) {
        return ResponseEntity.ok(mockInterviewRepository.findByStudentId(studentId));
    }

    @GetMapping("/senior/{seniorId}")
    public ResponseEntity<List<MockInterview>> getSeniorMockInterviews(@PathVariable Long seniorId) {
        return ResponseEntity.ok(mockInterviewRepository.findBySeniorId(seniorId));
    }

    @PostMapping
    public ResponseEntity<MockInterview> requestMockInterview(@RequestBody MockInterview interview) {
        interview.setStatus("SCHEDULED");
        return ResponseEntity.status(HttpStatus.CREATED).body(mockInterviewRepository.save(interview));
    }

    @PutMapping("/{id}/feedback")
    public ResponseEntity<?> submitFeedback(@PathVariable Long id, @RequestBody MockInterview feedback) {
        MockInterview existing = mockInterviewRepository.findById(id).orElse(null);
        if (existing == null) return ResponseEntity.notFound().build();

        existing.setDsaScore(feedback.getDsaScore());
        existing.setJavaScore(feedback.getJavaScore());
        existing.setDbmsScore(feedback.getDbmsScore());
        existing.setOopScore(feedback.getOopScore());
        existing.setSqlScore(feedback.getSqlScore());
        existing.setCommunicationScore(feedback.getCommunicationScore());
        existing.setProblemSolvingScore(feedback.getProblemSolvingScore());
        existing.setConfidenceScore(feedback.getConfidenceScore());
        existing.setDetailedFeedback(feedback.getDetailedFeedback());

        // Calculate overall average score
        int total = 0;
        int count = 0;
        if (feedback.getDsaScore() != null) { total += feedback.getDsaScore(); count++; }
        if (feedback.getJavaScore() != null) { total += feedback.getJavaScore(); count++; }
        if (feedback.getDbmsScore() != null) { total += feedback.getDbmsScore(); count++; }
        if (feedback.getOopScore() != null) { total += feedback.getOopScore(); count++; }
        if (feedback.getSqlScore() != null) { total += feedback.getSqlScore(); count++; }
        if (feedback.getCommunicationScore() != null) { total += feedback.getCommunicationScore(); count++; }
        if (feedback.getProblemSolvingScore() != null) { total += feedback.getProblemSolvingScore(); count++; }
        if (feedback.getConfidenceScore() != null) { total += feedback.getConfidenceScore(); count++; }

        existing.setOverallScore(count > 0 ? (double) total / count : 8.0);
        existing.setStatus("COMPLETED");
        existing.setCompletedAt(LocalDateTime.now());

        MockInterview saved = mockInterviewRepository.save(existing);

        try {
            rabbitTemplate.convertAndSend("seniorconnect.exchange", "mock.interview.completed", Map.of(
                "eventId", "MOCK-" + saved.getId(),
                "studentId", saved.getStudentId(),
                "overallScore", saved.getOverallScore(),
                "seniorName", saved.getSeniorName()
            ));
        } catch (Exception e) {
            System.err.println("RabbitMQ notification dispatch skipped: " + e.getMessage());
        }

        return ResponseEntity.ok(saved);
    }
}
