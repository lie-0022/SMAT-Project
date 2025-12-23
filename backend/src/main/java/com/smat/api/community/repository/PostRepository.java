package com.smat.api.community.repository;

import com.smat.api.community.domain.Category;
import com.smat.api.community.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    /**
     * 카테고리별 게시글 조회
     */
    List<Post> findByCategory(Category category);
    
    /**
     * 작성자별 게시글 조회
     */
    List<Post> findByWriter(String writer);
}
