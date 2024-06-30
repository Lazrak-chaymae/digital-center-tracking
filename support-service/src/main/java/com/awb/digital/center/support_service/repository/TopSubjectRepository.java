package com.awb.digital.center.support_service.repository;

import com.awb.digital.center.support_service.entity.Support;
import com.awb.digital.center.support_service.entity.TopSubject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopSubjectRepository extends JpaRepository<TopSubject, Long> {
}
