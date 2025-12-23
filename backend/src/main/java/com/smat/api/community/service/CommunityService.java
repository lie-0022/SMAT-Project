package com.smat.api.community.service;

import com.smat.api.community.domain.Category;
import com.smat.api.community.domain.Post;
import com.smat.api.community.dto.PostResponseDto;
import com.smat.api.community.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CommunityService {
    
    private final PostRepository postRepository;
    
    public CommunityService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
    
    /**
     * 전체 게시글 조회
     * 
     * @return 전체 게시글 리스트
     */
    public List<PostResponseDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return convertToDto(posts);
    }
    
    /**
     * 카테고리별 게시글 조회
     * 
     * @param category 카테고리 (TAXI/BOOK/TEAM)
     * @return 해당 카테고리의 게시글 리스트
     */
    public List<PostResponseDto> getPostsByCategory(Category category) {
        List<Post> posts = postRepository.findByCategory(category);
        return convertToDto(posts);
    }
    
    /**
     * Post 리스트를 DTO로 변환
     */
    private List<PostResponseDto> convertToDto(List<Post> posts) {
        List<PostResponseDto> response = new ArrayList<>();
        for (Post post : posts) {
            PostResponseDto dto = new PostResponseDto(
                post.getId(),
                post.getCategory(),
                post.getTitle(),
                post.getContent(),
                post.getWriter(),
                post.getPrice(),
                post.getCurrentPeople(),
                post.getMaxPeople()
            );
            response.add(dto);
        }
        return response;
    }
}
