package com.seniorconnect.mentorship.controller;

import com.seniorconnect.mentorship.entity.SeniorReview;
import com.seniorconnect.mentorship.repository.SeniorReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final SeniorReviewRepository seniorReviewRepository;

    @GetMapping("/senior/{seniorId}")
    public ResponseEntity<List<SeniorReview>> getSeniorReviews(@PathVariable Long seniorId) {
        return ResponseEntity.ok(seniorReviewRepository.findBySeniorId(seniorId));
    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody SeniorReview review) {
        boolean duplicate = seniorReviewRepository.existsBySeniorIdAndStudentId(review.getSeniorId(), review.getStudentId());
        if (duplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "You have already submitted a review for this senior mentor."));
        }
        SeniorReview saved = seniorReviewRepository.save(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
