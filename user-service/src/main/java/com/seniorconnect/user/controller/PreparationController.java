package com.seniorconnect.user.controller;

import com.seniorconnect.user.entity.*;
import com.seniorconnect.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PreparationController {

    private final DsaProgressRepository dsaProgressRepository;
    private final AptitudeProgressRepository aptitudeProgressRepository;
    private final CsTopicProgressRepository csTopicProgressRepository;
    private final CompanyApplicationRepository companyApplicationRepository;

    // DSA Tracker
    @GetMapping("/preparation/dsa/{studentId}")
    public ResponseEntity<List<DsaProgress>> getDsaProgress(@PathVariable Long studentId) {
        return ResponseEntity.ok(dsaProgressRepository.findByStudentId(studentId));
    }

    @PostMapping("/preparation/dsa")
    public ResponseEntity<DsaProgress> saveDsaProgress(@RequestBody DsaProgress dsaProgress) {
        return ResponseEntity.ok(dsaProgressRepository.save(dsaProgress));
    }

    // Aptitude Tracker
    @GetMapping("/preparation/aptitude/{studentId}")
    public ResponseEntity<List<AptitudeProgress>> getAptitudeProgress(@PathVariable Long studentId) {
        return ResponseEntity.ok(aptitudeProgressRepository.findByStudentId(studentId));
    }

    @PostMapping("/preparation/aptitude")
    public ResponseEntity<AptitudeProgress> saveAptitudeProgress(@RequestBody AptitudeProgress aptitudeProgress) {
        return ResponseEntity.ok(aptitudeProgressRepository.save(aptitudeProgress));
    }

    // CS Core Tracker
    @GetMapping("/preparation/cs/{studentId}")
    public ResponseEntity<List<CsTopicProgress>> getCsProgress(@PathVariable Long studentId) {
        return ResponseEntity.ok(csTopicProgressRepository.findByStudentId(studentId));
    }

    @PostMapping("/preparation/cs")
    public ResponseEntity<CsTopicProgress> saveCsProgress(@RequestBody CsTopicProgress csTopicProgress) {
        return ResponseEntity.ok(csTopicProgressRepository.save(csTopicProgress));
    }

    // Company Application Tracker (Kanban)
    @GetMapping("/applications/{studentId}")
    public ResponseEntity<List<CompanyApplication>> getApplications(@PathVariable Long studentId) {
        return ResponseEntity.ok(companyApplicationRepository.findByStudentId(studentId));
    }

    @PostMapping("/applications")
    public ResponseEntity<CompanyApplication> saveApplication(@RequestBody CompanyApplication app) {
        return ResponseEntity.ok(companyApplicationRepository.save(app));
    }

    @PutMapping("/applications/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        CompanyApplication app = companyApplicationRepository.findById(id).orElse(null);
        if (app == null) return ResponseEntity.notFound().build();
        app.setStatus(body.get("status"));
        return ResponseEntity.ok(companyApplicationRepository.save(app));
    }
}
