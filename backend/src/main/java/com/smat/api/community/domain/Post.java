package com.smat.api.community.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    private Category category; // TAXI, BOOK, TEAM
    
    @Column(name = "title", nullable = false)
    private String title;
    
    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(name = "writer", nullable = false)
    private String writer;
    
    @Column(name = "price")
    private Integer price; // 택시, 책 등에 사용
    
    @Column(name = "current_people")
    private Integer currentPeople; // 현재 모집 인원
    
    @Column(name = "max_people")
    private Integer maxPeople; // 최대 모집 인원
    
    @Column(name = "created_date")
    private LocalDateTime createdDate; // 작성일
    
    // 기본 생성자
    public Post() {
        this.createdDate = LocalDateTime.now();
    }
    
    // 생성자
    public Post(Long id, Category category, String title, String content, String writer, 
                Integer price, Integer currentPeople, Integer maxPeople, LocalDateTime createdDate) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.price = price;
        this.currentPeople = currentPeople;
        this.maxPeople = maxPeople;
        this.createdDate = createdDate != null ? createdDate : LocalDateTime.now();
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
