package com.smat.api.campus.dto;

import java.time.LocalDate;

public class MenuResponseDto {
    
    private Long id;
    private LocalDate date;
    private String timeType;
    private String menuName;
    private Integer price;
    private String restaurantName;
    
    // 기본 생성자
    public MenuResponseDto() {
    }
    
    // 생성자
    public MenuResponseDto(Long id, LocalDate date, String timeType, String menuName, Integer price, String restaurantName) {
        this.id = id;
        this.date = date;
        this.timeType = timeType;
        this.menuName = menuName;
        this.price = price;
        this.restaurantName = restaurantName;
    }
    
    // Getter & Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public String getTimeType() {
        return timeType;
    }
    
    public void setTimeType(String timeType) {
        this.timeType = timeType;
    }
    
    public String getMenuName() {
        return menuName;
    }
    
    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }
    
    public Integer getPrice() {
        return price;
    }
    
    public void setPrice(Integer price) {
        this.price = price;
    }
    
    public String getRestaurantName() {
        return restaurantName;
    }
    
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
}
