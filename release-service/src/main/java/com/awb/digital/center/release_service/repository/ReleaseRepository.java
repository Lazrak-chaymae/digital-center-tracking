package com.awb.digital.center.release_service.repository;

import com.awb.digital.center.release_service.entity.Release;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReleaseRepository extends JpaRepository<Release, Long> {

}
