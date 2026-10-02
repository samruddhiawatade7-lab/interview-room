package com.seniorconnect.user.repository;

import com.seniorconnect.user.entity.Company;
import com.seniorconnect.user.entity.DsaProgress;
import com.seniorconnect.user.entity.AptitudeProgress;
import com.seniorconnect.user.entity.CsTopicProgress;
import com.seniorconnect.user.entity.CompanyApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {}

interface DsaProgressRepository extends JpaRepository<DsaProgress, Long> {
    List<DsaProgress> findByStudentId(Long studentId);
}

interface AptitudeProgressRepository extends JpaRepository<AptitudeProgress, Long> {
    List<AptitudeProgress> findByStudentId(Long studentId);
}

interface CsTopicProgressRepository extends JpaRepository<CsTopicProgress, Long> {
    List<CsTopicProgress> findByStudentId(Long studentId);
}

interface CompanyApplicationRepository extends JpaRepository<CompanyApplication, Long> {
    List<CompanyApplication> findByStudentId(Long studentId);
}
