package com.smat.api.test.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Tag(name = "헬스체크", description = "서버 상태 확인 API")
@RestController
@RequestMapping("/api/health")
public class HealthCheckController {
    
    /**
     * 서버 상태 확인 API
     * 프론트엔드에서 백엔드 연결 테스트용
     * 
     * @return "Backend is Active!" 메시지
     */
    @Operation(summary = "서버 상태 확인", description = "백엔드 서버가 정상적으로 동작하는지 확인합니다.")
    @GetMapping
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is Active!");
    }
    
    /**
     * 상세 서버 정보 확인 API (추가 기능)
     * 서버 시간 및 상태 정보 포함
     * 
     * @return 서버 상태 정보
     */
    @Operation(summary = "서버 상세 정보 확인", description = "서버의 상세 정보를 확인합니다.")
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> healthCheckInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("status", "Active");
        info.put("message", "Backend is running successfully!");
        info.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        info.put("version", "1.0.0");
        
        return ResponseEntity.ok(info);
    }
}
