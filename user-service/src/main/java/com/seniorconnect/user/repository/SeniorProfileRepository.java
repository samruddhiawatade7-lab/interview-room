package com.seniorconnect.user.repository;

import com.seniorconnect.user.entity.SeniorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SeniorProfileRepository extends JpaRepository<SeniorProfile, Long> {
    Optional<SeniorProfile> findByUserId(Long userId);

    @Query("SELECT s FROM SeniorProfile s WHERE " +
           "(:company IS NULL OR LOWER(s.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:role IS NULL OR LOWER(s.role) LIKE LOWER(CONCAT('%', :role, '%'))) AND " +
           "(:skill IS NULL OR LOWER(s.skills) LIKE LOWER(CONCAT('%', :skill, '%'))) AND " +
           "(:verified IS NULL OR s.verified = :verified) AND " +
           "(:search IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.company) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(s.role) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<SeniorProfile> searchSeniors(@Param("company") String company,
                                      @Param("role") String role,
                                      @Param("skill") String skill,
                                      @Param("verified") Boolean verified,
                                      @Param("search") String search);
}
