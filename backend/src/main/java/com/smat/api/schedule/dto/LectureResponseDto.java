package com.smat.api.schedule.dto;

public class LectureResponseDto {
    
    private Long id;
    private String name;
    private String professor;
    private String day;
    private String time;
    private String room;
    
    // 기본 생성자
    public LectureResponseDto() {
    }
    
    // 생성자
    public LectureResponseDto(Long id, String name, String professor, String day, String time, String room) {
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
