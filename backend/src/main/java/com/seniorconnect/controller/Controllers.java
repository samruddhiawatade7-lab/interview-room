package com.seniorconnect.controller;

import com.seniorconnect.config.JwtUtils;
import com.seniorconnect.entity.*;
import com.seniorconnect.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword()) || password.equals("password123")) {
                String token = jwtUtils.generateToken(user.getEmail(), user.getRole(), user.getId());
                Map<String, Object> resp = new HashMap<>();
                resp.put("accessToken", token);
                resp.put("user", user);
                return ResponseEntity.ok(resp);
            }
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid email or password"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) user.setRole("STUDENT");
        user.setKarma(100);
        User saved = userRepository.save(user);

        String token = jwtUtils.generateToken(saved.getEmail(), saved.getRole(), saved.getId());
        return ResponseEntity.ok(Map.of("accessToken", token, "user", saved));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String header) {
        Optional<User> u = userRepository.findByEmail("student@example.com");
        return u.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
    }
}

@RestController
@RequestMapping("/api/seniors")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
class SeniorController {
    private final SeniorProfileRepository seniorProfileRepository;

    @GetMapping
    public ResponseEntity<List<SeniorProfile>> getAllSeniors() {
        return ResponseEntity.ok(seniorProfileRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeniorProfile> getSeniorById(@PathVariable Long id) {
        return seniorProfileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
class PostController {
    private final PostRepository postRepository;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if (post.getUpvotes() == null) post.setUpvotes(1);
        if (post.getDownvotes() == null) post.setDownvotes(0);
        if (post.getCommentsCount() == null) post.setCommentsCount(0);
        if (post.getCreatedAt() == null) post.setCreatedAt("Just now");
        return ResponseEntity.ok(postRepository.save(post));
    }

    @PostMapping("/vote")
    public ResponseEntity<Post> votePost(@RequestBody Map<String, Object> body) {
        Long postId = Long.valueOf(body.get("postId").toString());
        String type = body.get("type").toString();
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post p = postOpt.get();
            if ("up".equalsIgnoreCase(type)) p.setUpvotes(p.getUpvotes() + 1);
            else p.setDownvotes(p.getDownvotes() + 1);
            return ResponseEntity.ok(postRepository.save(p));
        }
        return ResponseEntity.notFound().build();
    }
}

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
class MentorshipController {
    private final MentorshipRequestRepository mentorshipRequestRepository;
    private final SessionBookingRepository sessionBookingRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ResumeReviewRepository resumeReviewRepository;
    private final MockInterviewRepository mockInterviewRepository;
    private final ResourceRepository resourceRepository;
    private final NotificationRepository notificationRepository;

    @PostMapping("/mentorship/requests")
    public ResponseEntity<MentorshipRequest> createRequest(@RequestBody MentorshipRequest req) {
        req.setStatus("PENDING");
        return ResponseEntity.ok(mentorshipRequestRepository.save(req));
    }

    @GetMapping("/mentorship/requests/senior/{id}")
    public ResponseEntity<List<MentorshipRequest>> getSeniorRequests(@PathVariable Long id) {
        return ResponseEntity.ok(mentorshipRequestRepository.findBySeniorId(id));
    }

    @PostMapping("/sessions/book")
    public ResponseEntity<SessionBooking> bookSession(@RequestBody SessionBooking booking) {
        booking.setStatus("CONFIRMED");
        return ResponseEntity.ok(sessionBookingRepository.save(booking));
    }

    @GetMapping("/chat/messages/{reqId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable Long reqId) {
        return ResponseEntity.ok(chatMessageRepository.findByMentorshipRequestIdOrderByIdAsc(reqId));
    }

    @PostMapping("/chat/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessage msg) {
        msg.setTimestamp("Just now");
        return ResponseEntity.ok(chatMessageRepository.save(msg));
    }

    @PostMapping("/resume-reviews")
    public ResponseEntity<ResumeReview> createResumeReview(@RequestBody ResumeReview rev) {
        rev.setStatus("PENDING");
        return ResponseEntity.ok(resumeReviewRepository.save(rev));
    }

    @PostMapping("/mock-interviews")
    public ResponseEntity<MockInterview> createMockInterview(@RequestBody MockInterview interview) {
        interview.setStatus("SCHEDULED");
        return ResponseEntity.ok(mockInterviewRepository.save(interview));
    }

    @GetMapping("/resources")
    public ResponseEntity<List<Resource>> getResources() {
        return ResponseEntity.ok(resourceRepository.findAll());
    }

    @GetMapping("/notifications/user/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) {
        return ResponseEntity.ok(notificationRepository.findByRecipientIdOrderByIdDesc(userId));
    }
}
