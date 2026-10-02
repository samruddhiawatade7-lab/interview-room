package com.seniorconnect.user.controller;

import com.seniorconnect.user.entity.SeniorProfile;
import com.seniorconnect.user.repository.SeniorProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seniors")
@RequiredArgsConstructor
public class SeniorController {

    private final SeniorProfileRepository seniorProfileRepository;

    @GetMapping
    public ResponseEntity<List<SeniorProfile>> getAllSeniors(
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) Boolean verified,
            @RequestParam(required = false) String search) {
        
        List<SeniorProfile> result = seniorProfileRepository.searchSeniors(
                company != null && !company.isEmpty() ? company : null,
                role != null && !role.isEmpty() ? role : null,
                skill != null && !skill.isEmpty() ? skill : null,
                verified,
                search != null && !search.isEmpty() ? search : null
        );
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeniorById(@PathVariable Long id) {
        SeniorProfile senior = seniorProfileRepository.findById(id).orElse(null);
        if (senior == null) {
            senior = seniorProfileRepository.findByUserId(id).orElse(null);
        }
        if (senior == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(senior);
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> verifySenior(@PathVariable Long id, @RequestBody Map<String, Boolean> body) {
        SeniorProfile senior = seniorProfileRepository.findById(id).orElse(null);
        if (senior == null) {
            return ResponseEntity.notFound().build();
        }
        Boolean status = body.getOrDefault("verified", true);
        senior.setVerified(status);
        seniorProfileRepository.save(senior);
        return ResponseEntity.ok(Map.of("message", "Senior verification status updated", "verified", status));
    }

    @PostMapping("/profile")
    public ResponseEntity<?> saveOrUpdateSeniorProfile(@RequestBody SeniorProfile profile) {
        SeniorProfile existing = seniorProfileRepository.findByUserId(profile.getUserId()).orElse(null);
        if (existing != null) {
            if (profile.getCompany() != null) existing.setCompany(profile.getCompany());
            if (profile.getRole() != null) existing.setRole(profile.getRole());
            if (profile.getSkills() != null) existing.setSkills(profile.getSkills());
            if (profile.getBio() != null) existing.setBio(profile.getBio());
            if (profile.getMentorshipCategories() != null) existing.setMentorshipCategories(profile.getMentorshipCategories());
            if (profile.getAvailability() != null) existing.setAvailability(profile.getAvailability());
            if (profile.getExperience() != null) existing.setExperience(profile.getExperience());
            if (profile.getPlacementJourney() != null) existing.setPlacementJourney(profile.getPlacementJourney());
            return ResponseEntity.ok(seniorProfileRepository.save(existing));
        }
        return ResponseEntity.ok(seniorProfileRepository.save(profile));
    }
}
