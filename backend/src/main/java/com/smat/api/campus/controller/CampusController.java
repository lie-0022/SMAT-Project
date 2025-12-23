package com.smat.api.campus.controller;

import com.smat.api.campus.dto.MenuResponseDto;
import com.smat.api.campus.service.CampusService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "학식 메뉴", description = "학식 관련 API")
@RestController
@RequestMapping("/api/campus")
public class CampusController {
    
    private final CampusService campusService;
    
    public CampusController(CampusService campusService) {
        this.campusService = campusService;
    }
    
    /**
     * 오늘 날짜의 학식 메뉴를 조회하는 API
     * 
     * @return 오늘 날짜의 메뉴 리스트
     */
    @Operation(summary = "오늘의 메뉴 조회", description = "오늘 날짜의 모든 식당 메뉴를 반환합니다.")
    @GetMapping("/menus")
    public ResponseEntity<List<MenuResponseDto>> getTodayMenus() {
        List<MenuResponseDto> menus = campusService.getTodayMenus();
        return ResponseEntity.ok(menus);
    }
    
    /**
     * 특정 날짜의 학식 메뉴를 조회하는 API
     * 
     * @param date 조회할 날짜 (형식: yyyy-MM-dd)
     * @return 해당 날짜의 메뉴 리스트
     */
    @Operation(summary = "특정 날짜 학식 메뉴 조회", description = "지정한 날짜의 전체 학식 메뉴를 조회합니다.")
    @GetMapping("/menus/date")
    public ResponseEntity<List<MenuResponseDto>> getMenusByDate(
            @Parameter(description = "조회할 날짜 (yyyy-MM-dd)", example = "2024-03-15")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<MenuResponseDto> menus = campusService.getMenusByDate(date);
        return ResponseEntity.ok(menus);
    }
    
    /**
     * 특정 날짜와 시간대의 학식 메뉴를 조회하는 API
     * 
     * @param date 조회할 날짜 (형식: yyyy-MM-dd)
     * @param timeType 시간대 (조식/중식/석식)
     * @return 해당 조건의 메뉴 리스트
     */
    @Operation(summary = "날짜 및 시간대별 학식 메뉴 조회", 
               description = "지정한 날짜와 시간대(조식/중식/석식)의 학식 메뉴를 조회합니다.")
    @GetMapping("/menus/search")
    public ResponseEntity<List<MenuResponseDto>> getMenusByDateAndTimeType(
            @Parameter(description = "조회할 날짜 (yyyy-MM-dd)", example = "2024-03-15")
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @Parameter(description = "시간대 (조식/중식/석식)", example = "중식")
            @RequestParam String timeType) {
        List<MenuResponseDto> menus = campusService.getMenusByDateAndTimeType(date, timeType);
        return ResponseEntity.ok(menus);
    }
}
