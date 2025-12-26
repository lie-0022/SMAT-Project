package com.smat.api.community.dto;

import com.smat.api.community.domain.Category;

import java.time.LocalDateTime;

public class PostResponseDto {
    
    private Long id;
    private Category category;
    private String title;
    private String content;
    private String writer;
    private Integer price;
    private Integer currentPeople;
    private Integer maxPeople;
    private LocalDateTime createdDate;
    
    // 기본 생성자
    public PostResponseDto() {
    }
    
    // 생성자
    public PostResponseDto(Long id, Category category, String title, String content, String writer, 
                           Integer price, Integer currentPeople, Integer maxPeople, LocalDateTime createdDate) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.price = price;
        this.currentPeople = currentPeople;
        this.maxPeople = maxPeople;
        this.createdDate = createdDate;
    }
    
    // Getter & Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Category getCategory() {
        return category;
    }
    
    public void setCategory(Category category) {
        this.category = category;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getWriter() {
        return writer;
    }
    
    public void setWriter(String writer) {
        this.writer = writer;
    }
    
    public Integer getPrice() {
        return price;
    }
    
    public void setPrice(Integer price) {
        this.price = price;
    }
    
    public Integer getCurrentPeople() {
        return currentPeople;
    }
    
    public void setCurrentPeople(Integer currentPeople) {
        this.currentPeople = currentPeople;
    }
    
    public Integer getMaxPeople() {
        return maxPeople;
    }
    
    public void setMaxPeople(Integer maxPeople) {
        this.maxPeople = maxPeople;
    }
    
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
