package com.seniorconnect.resource.controller;

import com.seniorconnect.resource.entity.Bookmark;
import com.seniorconnect.resource.entity.Resource;
import com.seniorconnect.resource.repository.BookmarkRepository;
import com.seniorconnect.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceRepository resourceRepository;
    private final BookmarkRepository bookmarkRepository;

    @GetMapping
    public ResponseEntity<List<Resource>> getResources(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search) {
        
        return ResponseEntity.ok(resourceRepository.searchResources(
                category != null && !category.isEmpty() ? category : null,
                difficulty != null && !difficulty.isEmpty() ? difficulty : null,
                search != null && !search.isEmpty() ? search : null
        ));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Resource>> getPendingResources() {
        return ResponseEntity.ok(resourceRepository.findByStatus("PENDING"));
    }

    @PostMapping
    public ResponseEntity<Resource> createResource(@RequestBody Resource resource) {
        resource.setStatus("APPROVED"); // Default approved for senior contributions
        return ResponseEntity.status(HttpStatus.CREATED).body(resourceRepository.save(resource));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveResource(@PathVariable Long id) {
        Resource res = resourceRepository.findById(id).orElse(null);
        if (res == null) return ResponseEntity.notFound().build();
        res.setStatus("APPROVED");
        return ResponseEntity.ok(resourceRepository.save(res));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectResource(@PathVariable Long id) {
        Resource res = resourceRepository.findById(id).orElse(null);
        if (res == null) return ResponseEntity.notFound().build();
        res.setStatus("REJECTED");
        return ResponseEntity.ok(resourceRepository.save(res));
    }

    // Bookmarks
    @GetMapping("/bookmarks/{userId}")
    public ResponseEntity<List<Resource>> getUserBookmarks(@PathVariable Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(userId);
        List<Long> resourceIds = bookmarks.stream().map(Bookmark::getResourceId).collect(Collectors.toList());
        List<Resource> resources = resourceRepository.findAllById(resourceIds);
        return ResponseEntity.ok(resources);
    }

    @PostMapping("/bookmarks/{userId}/{resourceId}")
    public ResponseEntity<?> toggleBookmark(@PathVariable Long userId, @PathVariable Long resourceId) {
        Resource resource = resourceRepository.findById(resourceId).orElse(null);
        if (resource == null) return ResponseEntity.notFound().build();

        boolean exists = bookmarkRepository.existsByUserIdAndResourceId(userId, resourceId);
        if (exists) {
            Bookmark bookmark = bookmarkRepository.findByUserIdAndResourceId(userId, resourceId).orElse(null);
            if (bookmark != null) bookmarkRepository.delete(bookmark);
            resource.setBookmarksCount(Math.max(0, resource.getBookmarksCount() - 1));
            resourceRepository.save(resource);
            return ResponseEntity.ok(Map.of("bookmarked", false, "message", "Bookmark removed"));
        } else {
            bookmarkRepository.save(Bookmark.builder().userId(userId).resourceId(resourceId).build());
            resource.setBookmarksCount(resource.getBookmarksCount() + 1);
            resourceRepository.save(resource);
            return ResponseEntity.ok(Map.of("bookmarked", true, "message", "Bookmark added"));
        }
    }
}
