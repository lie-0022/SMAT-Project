package com.smat.api.schedule.domain;

import javax.persistence.*;

@Entity
@Table(name = "lecture")
public class Lecture {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "professor", nullable = false)
    private String professor;
    
    @Column(name = "lecture_day", nullable = false)
    private String day; // 월, 화, 수, 목, 금
    
    @Column(name = "time", nullable = false)
    private String time; // 예: "10:00-12:00"
    
    @Column(name = "room", nullable = false)
    private String room;
    
    // 기본 생성자
    public Lecture() {
    }
    
    // 생성자
    public Lecture(Long id, String name, String professor, String day, String time, String room) {
        this.id = id;
        this.name = name;
        this.professor = professor;
        this.day = day;
        this.time = time;
        this.room = room;
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
    
    public String getProfessor() {
        return professor;
    }
    
    public void setProfessor(String professor) {
        this.professor = professor;
    }
    
    public String getDay() {
        return day;
    }
    
    public void setDay(String day) {
        this.day = day;
    }
    
    public String getTime() {
        return time;
    }
    
    public void setTime(String time) {
        this.time = time;
    }
    
    public String getRoom() {
        return room;
    }
    
    public void setRoom(String room) {
        this.room = room;
    }
}
