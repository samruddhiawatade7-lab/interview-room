package com.seniorconnect.mentorship.controller;

import com.seniorconnect.mentorship.entity.AvailabilitySlot;
import com.seniorconnect.mentorship.entity.SessionBooking;
import com.seniorconnect.mentorship.repository.AvailabilitySlotRepository;
import com.seniorconnect.mentorship.repository.SessionBookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionBookingRepository sessionBookingRepository;
    private final AvailabilitySlotRepository availabilitySlotRepository;

    @GetMapping("/availability/senior/{seniorId}")
    public ResponseEntity<List<AvailabilitySlot>> getAvailabilitySlots(@PathVariable Long seniorId) {
        return ResponseEntity.ok(availabilitySlotRepository.findBySeniorId(seniorId));
    }

    @PostMapping("/availability")
    public ResponseEntity<AvailabilitySlot> createAvailabilitySlot(@RequestBody AvailabilitySlot slot) {
        return ResponseEntity.status(HttpStatus.CREATED).body(availabilitySlotRepository.save(slot));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<SessionBooking>> getStudentSessions(@PathVariable Long studentId) {
        return ResponseEntity.ok(sessionBookingRepository.findByStudentId(studentId));
    }

    @GetMapping("/senior/{seniorId}")
    public ResponseEntity<List<SessionBooking>> getSeniorSessions(@PathVariable Long seniorId) {
        return ResponseEntity.ok(sessionBookingRepository.findBySeniorId(seniorId));
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookSession(@RequestBody SessionBooking booking) {
        // Prevent double booking for senior on same date and time slot
        boolean exists = sessionBookingRepository.existsBySeniorIdAndDateAndTimeSlotAndStatusNot(
                booking.getSeniorId(), booking.getDate(), booking.getTimeSlot(), "CANCELLED"
        );

        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "This slot is already booked for the selected senior. Please choose another slot."));
        }

        booking.setStatus("CONFIRMED");
        SessionBooking saved = sessionBookingRepository.save(booking);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateSessionStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        SessionBooking booking = sessionBookingRepository.findById(id).orElse(null);
        if (booking == null) return ResponseEntity.notFound().build();

        booking.setStatus(body.get("status"));
        return ResponseEntity.ok(sessionBookingRepository.save(booking));
    }
}
