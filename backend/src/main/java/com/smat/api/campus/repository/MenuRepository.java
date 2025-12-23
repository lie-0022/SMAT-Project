package com.smat.api.campus.repository;

import com.smat.api.campus.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    
    /**
     * 특정 날짜의 메뉴 조회
     */
    List<Menu> findByDate(LocalDate date);
    
    /**
     * 특정 날짜와 시간대의 메뉴 조회
     */
    List<Menu> findByDateAndTimeType(LocalDate date, String timeType);
}
