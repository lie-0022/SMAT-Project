package com.smat.api.campus.domain;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "menu")
public class Menu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;
    
    @Column(name = "time_type", nullable = false)
    private String timeType; // 조식, 중식, 석식
    
    @Column(name = "menu_name", nullable = false)
    private String menuName;
    
    @Column(name = "price")
    private Integer price;
    
    @Column(name = "restaurant_id", nullable = false)
    private Long restaurantId;
    
    // 기본 생성자
    public Menu() {
    }
    
    // 생성자
    public Menu(Long id, LocalDate date, String timeType, String menuName, Integer price, Long restaurantId) {
        this.id = id;
        this.date = date;
        this.timeType = timeType;
        this.menuName = menuName;
        this.price = price;
        this.restaurantId = restaurantId;
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
    
    public Long getRestaurantId() {
        return restaurantId;
    }
    
    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }
}
