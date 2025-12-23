package com.smat.api.schedule.repository;

import com.smat.api.schedule.domain.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<Lecture, Long> {
    
    /**
     * 요일별 강의 조회
     */
    List<Lecture> findByDay(String day);
    
    /**
     * 교수명으로 강의 조회
     */
    List<Lecture> findByProfessor(String professor);
}
