package com.smat.api.community.controller;

import com.smat.api.community.domain.Category;
import com.smat.api.community.dto.PostResponseDto;
import com.smat.api.community.service.CommunityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "커뮤니티", description = "커뮤니티 게시판 API")
@RestController
@RequestMapping("/api/community")
public class CommunityController {
    
    private final CommunityService communityService;
    
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }
    
    /**
     * 전체 게시글 목록 조회
     * 
     * @return 전체 게시글 리스트
     */
    @Operation(summary = "전체 게시글 조회", description = "모든 카테고리의 게시글을 조회합니다.")
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        List<PostResponseDto> posts = communityService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    
    /**
     * 카테고리별 게시글 목록 조회
     * 
     * @param category 카테고리 (TAXI/BOOK/TEAM)
     * @return 해당 카테고리의 게시글 리스트
     */
    @Operation(summary = "게시글 목록 조회", description = "특정 카테고리의 게시글을 조회합니다.")
    @GetMapping("/posts/category")
    public ResponseEntity<List<PostResponseDto>> getPostsByCategory(
            @Parameter(description = "카테고리 (TAXI/BOOK/TEAM)", example = "TAXI")
            @RequestParam Category category) {
        List<PostResponseDto> posts = communityService.getPostsByCategory(category);
        return ResponseEntity.ok(posts);
    }
}
