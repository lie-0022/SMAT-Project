package com.smat.api.schedule.service;

import com.smat.api.schedule.domain.Lecture;
import com.smat.api.schedule.dto.LectureResponseDto;
import com.smat.api.schedule.repository.LectureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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
     * 다음 수업 조회
     * 현재 시간 이후에 시작하는 가장 빠른 수업을 반환합니다.
     * 
     * @return 다음 수업 정보 (없으면 null)
     */
    public LectureResponseDto getNextLecture() {
        // 1. 현재 날짜와 시간 가져오기
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        
        // 2. 오늘 요일 구하기 (월/화/수/목/금)
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        String todayKorean = getDayOfWeekKorean(dayOfWeek);
        
        // 3. 오늘 요일의 모든 강의 조회
        List<Lecture> todayLectures = lectureRepository.findByDay(todayKorean);
        
        // 4. 현재 시간 이후의 가장 빠른 강의 찾기
        Lecture nextLecture = null;
        LocalTime closestTime = null;
        
        for (Lecture lecture : todayLectures) {
            try {
                // 시간 파싱 (예: "10:00-12:00" -> "10:00")
                String[] timeParts = lecture.getTime().split("-");
                if (timeParts.length < 1) continue;
                
                String startTimeStr = timeParts[0].trim();
                LocalTime startTime = LocalTime.parse(startTimeStr);
                
                // 현재 시간보다 나중에 시작하는 강의인지 확인
                if (startTime.isAfter(now)) {
                    // 아직 찾지 못했거나, 더 빠른 강의를 찾았다면 업데이트
                    if (closestTime == null || startTime.isBefore(closestTime)) {
                        closestTime = startTime;
                        nextLecture = lecture;
                    }
                }
            } catch (Exception e) {
                // 시간 파싱 실패 시 무시
                System.err.println("시간 파싱 실패: " + lecture.getTime());
            }
        }
        
        // 5. 결과 반환
        if (nextLecture == null) {
            return null;
        }
        
        return new LectureResponseDto(
            nextLecture.getId(),
            nextLecture.getName(),
            nextLecture.getProfessor(),
            nextLecture.getDay(),
            nextLecture.getTime(),
            nextLecture.getRoom()
        );
    }
    
    /**
     * 영문 요일을 한글 요일로 변환
     */
    private String getDayOfWeekKorean(DayOfWeek dayOfWeek) {
        switch (dayOfWeek) {
            case MONDAY:
                return "월";
            case TUESDAY:
                return "화";
            case WEDNESDAY:
                return "수";
            case THURSDAY:
                return "목";
            case FRIDAY:
                return "금";
            case SATURDAY:
                return "토";
            case SUNDAY:
                return "일";
            default:
                return "";
        }
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
