package com.seniorconnect.resource.repository;

import com.seniorconnect.resource.entity.Bookmark;
import com.seniorconnect.resource.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByStatus(String status);
    List<Resource> findByUploaderId(Long uploaderId);

    @Query("SELECT r FROM Resource r WHERE r.status = 'APPROVED' AND " +
           "(:category IS NULL OR LOWER(r.category) = LOWER(:category)) AND " +
           "(:difficulty IS NULL OR LOWER(r.difficulty) = LOWER(:difficulty)) AND " +
           "(:search IS NULL OR LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.tags) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Resource> searchResources(@Param("category") String category,
                                   @Param("difficulty") String difficulty,
                                   @Param("search") String search);
}

interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);
    Optional<Bookmark> findByUserIdAndResourceId(Long userId, Long resourceId);
    boolean existsByUserIdAndResourceId(Long userId, Long resourceId);
}
