package com.seniorconnect.mentorship.controller;

import com.seniorconnect.mentorship.entity.ChatMessage;
import com.seniorconnect.mentorship.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;

    @GetMapping("/messages/{requestId}")
    public ResponseEntity<List<ChatMessage>> getMessagesByRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(chatMessageRepository.findByMentorshipRequestIdOrderByTimestampAsc(requestId));
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage message) {
        return ResponseEntity.ok(chatMessageRepository.save(message));
    }

    @GetMapping("/unread-count/{userId}")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Long userId) {
        long count = chatMessageRepository.countByRecipientIdAndIsReadFalse(userId);
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }
}
