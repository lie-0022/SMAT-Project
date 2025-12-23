package com.smat.api.campus.domain;

import javax.persistence.*;

@Entity
@Table(name = "restaurant")
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    // 기본 생성자
    public Restaurant() {
    }
    
    // 생성자
    public Restaurant(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    
    // Getter & Setter
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
