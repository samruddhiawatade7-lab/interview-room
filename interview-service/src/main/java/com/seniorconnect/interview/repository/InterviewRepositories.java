package com.seniorconnect.interview.repository;

import com.seniorconnect.interview.entity.InterviewExperience;
import com.seniorconnect.interview.entity.MockInterview;
import com.seniorconnect.interview.entity.ResumeReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InterviewExperienceRepository extends JpaRepository<InterviewExperience, Long> {
    List<InterviewExperience> findByStatus(String status);
    List<InterviewExperience> findBySeniorId(Long seniorId);

    @Query("SELECT e FROM InterviewExperience e WHERE e.status = 'APPROVED' AND " +
           "(:company IS NULL OR LOWER(e.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:role IS NULL OR LOWER(e.role) LIKE LOWER(CONCAT('%', :role, '%'))) AND " +
           "(:difficulty IS NULL OR LOWER(e.difficulty) = LOWER(:difficulty)) AND " +
           "(:search IS NULL OR LOWER(e.company) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.role) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(e.oaTopics) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<InterviewExperience> searchExperiences(@Param("company") String company,
                                                 @Param("role") String role,
                                                 @Param("difficulty") String difficulty,
                                                 @Param("search") String search);
}

interface MockInterviewRepository extends JpaRepository<MockInterview, Long> {
    List<MockInterview> findByStudentId(Long studentId);
    List<MockInterview> findBySeniorId(Long seniorId);
}

interface ResumeReviewRepository extends JpaRepository<ResumeReview, Long> {
    List<ResumeReview> findByStudentId(Long studentId);
    List<ResumeReview> findBySeniorId(Long seniorId);
}
