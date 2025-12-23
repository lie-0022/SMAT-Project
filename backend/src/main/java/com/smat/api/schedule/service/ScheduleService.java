package com.smat.api.schedule.service;

import com.smat.api.schedule.domain.Lecture;
import com.smat.api.schedule.dto.LectureResponseDto;
import com.smat.api.schedule.repository.LectureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ScheduleService {
    
    private final LectureRepository lectureRepository;
    
    public ScheduleService(LectureRepository lectureRepository) {
        this.lectureRepository = lectureRepository;
    }
    
    /**
     * 이번 주 전체 시간표 조회
     * 
     * @return 전체 강의 리스트
     */
    public List<LectureResponseDto> getWeeklySchedule() {
        List<Lecture> lectures = lectureRepository.findAll();
        
        List<LectureResponseDto> response = new ArrayList<>();
        for (Lecture lecture : lectures) {
            LectureResponseDto dto = new LectureResponseDto(
                lecture.getId(),
                lecture.getName(),
                lecture.getProfessor(),
                lecture.getDay(),
                lecture.getTime(),
                lecture.getRoom()
            );
            response.add(dto);
        }
        
        return response;
    }
    
    /**
     * 특정 요일의 시간표 조회
     * 
     * @param day 요일 (월/화/수/목/금)
     * @return 해당 요일의 강의 리스트
     */
    public List<LectureResponseDto> getScheduleByDay(String day) {
        List<Lecture> lectures = lectureRepository.findByDay(day);
        
        List<LectureResponseDto> response = new ArrayList<>();
        for (Lecture lecture : lectures) {
            LectureResponseDto dto = new LectureResponseDto(
                lecture.getId(),
                lecture.getName(),
                lecture.getProfessor(),
                lecture.getDay(),
                lecture.getTime(),
                lecture.getRoom()
            );
            response.add(dto);
        }
        
        return response;
    }
}
