package com.seniorconnect.interview.controller;

import com.seniorconnect.interview.entity.InterviewExperience;
import com.seniorconnect.interview.repository.InterviewExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interviews/experiences")
@RequiredArgsConstructor
public class InterviewExperienceController {

    private final InterviewExperienceRepository experienceRepository;

    @GetMapping
    public ResponseEntity<List<InterviewExperience>> getExperiences(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search) {
        
        return ResponseEntity.ok(experienceRepository.searchExperiences(
                company != null && !company.isEmpty() ? company : null,
                role != null && !role.isEmpty() ? role : null,
                difficulty != null && !difficulty.isEmpty() ? difficulty : null,
                search != null && !search.isEmpty() ? search : null
        ));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<InterviewExperience>> getPendingExperiences() {
        return ResponseEntity.ok(experienceRepository.findByStatus("PENDING"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        InterviewExperience exp = experienceRepository.findById(id).orElse(null);
        if (exp == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(exp);
    }

    @PostMapping
    public ResponseEntity<InterviewExperience> submitExperience(@RequestBody InterviewExperience experience) {
        experience.setStatus("PENDING"); // Requires admin approval for new submissions
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceRepository.save(experience));
    }

    @PutMapping("/{id}/helpful")
    public ResponseEntity<?> markHelpful(@PathVariable Long id) {
        InterviewExperience exp = experienceRepository.findById(id).orElse(null);
        if (exp == null) return ResponseEntity.notFound().build();
        exp.setHelpfulCount(exp.getHelpfulCount() + 1);
        return ResponseEntity.ok(experienceRepository.save(exp));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveExperience(@PathVariable Long id) {
        InterviewExperience exp = experienceRepository.findById(id).orElse(null);
        if (exp == null) return ResponseEntity.notFound().build();
        exp.setStatus("APPROVED");
        return ResponseEntity.ok(experienceRepository.save(exp));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectExperience(@PathVariable Long id) {
        InterviewExperience exp = experienceRepository.findById(id).orElse(null);
        if (exp == null) return ResponseEntity.notFound().build();
        exp.setStatus("REJECTED");
        return ResponseEntity.ok(experienceRepository.save(exp));
    }
}
