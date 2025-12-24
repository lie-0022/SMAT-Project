package com.smat.api.schedule.controller;

import com.smat.api.schedule.dto.LectureResponseDto;
import com.smat.api.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "시간표", description = "시간표 관리 API")
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    
    private final ScheduleService scheduleService;
    
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }
    
    /**
     * 이번 주 전체 시간표를 조회하는 API
     * 
     * @return 전체 강의 리스트
     */
    @Operation(summary = "내 시간표 조회", description = "이번 주 전체 시간표를 조회합니다.")
    @GetMapping
    public ResponseEntity<List<LectureResponseDto>> getWeeklySchedule() {
        List<LectureResponseDto> lectures = scheduleService.getWeeklySchedule();
        return ResponseEntity.ok(lectures);
    }
    
    /**
     * 특정 요일의 시간표를 조회하는 API
     * 
     * @param day 요일 (월/화/수/목/금)
     * @return 해당 요일의 강의 리스트
     */
    @Operation(summary = "요일별 시간표 조회", description = "특정 요일의 시간표를 조회합니다.")
    @GetMapping("/day")
    public ResponseEntity<List<LectureResponseDto>> getScheduleByDay(
            @Parameter(description = "요일 (월/화/수/목/금)", example = "월")
            @RequestParam String day) {
        List<LectureResponseDto> lectures = scheduleService.getScheduleByDay(day);
        return ResponseEntity.ok(lectures);
    }
    
    /**
     * 다음 수업을 조회하는 API
     * 현재 시간 이후에 시작하는 가장 빠른 수업 1개를 반환합니다.
     * 
     * @return 다음 수업 정보 (없으면 null)
     */
    @Operation(summary = "다음 수업 조회", description = "현재 시간 이후의 다음 수업을 조회합니다.")
    @GetMapping("/next")
    public ResponseEntity<LectureResponseDto> getNextLecture() {
        LectureResponseDto nextLecture = scheduleService.getNextLecture();
        if (nextLecture == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(nextLecture);
    }
}
