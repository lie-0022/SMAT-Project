package com.smat.api.config;

import com.smat.api.campus.domain.Menu;
import com.smat.api.campus.domain.Restaurant;
import com.smat.api.campus.repository.MenuRepository;
import com.smat.api.campus.repository.RestaurantRepository;
import com.smat.api.schedule.domain.Lecture;
import com.smat.api.schedule.repository.LectureRepository;
import com.smat.api.community.domain.Category;
import com.smat.api.community.domain.Post;
import com.smat.api.community.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class DataLoader implements CommandLineRunner {
    
    private final RestaurantRepository restaurantRepository;
    private final MenuRepository menuRepository;
    private final LectureRepository lectureRepository;
    private final PostRepository postRepository;
    
    public DataLoader(RestaurantRepository restaurantRepository, 
                      MenuRepository menuRepository,
                      LectureRepository lectureRepository,
                      PostRepository postRepository) {
        this.restaurantRepository = restaurantRepository;
        this.menuRepository = menuRepository;
        this.lectureRepository = lectureRepository;
        this.postRepository = postRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        // 데이터가 이미 존재하는지 확인
        if (restaurantRepository.count() > 0) {
            System.out.println("✅ 데이터가 이미 존재합니다. 초기 데이터 로딩을 건너뜁니다.");
            return;
        }
        
        System.out.println("🔄 초기 데이터를 로딩합니다...");
        
        // ========== 1. 학식 메뉴 데이터 ==========
        loadCampusMenuData();
        
        // ========== 2. 시간표 데이터 ==========
        loadScheduleData();
        
        // ========== 3. 커뮤니티 데이터 ==========
        loadCommunityData();
        
        System.out.println("🎉 초기 데이터 로딩이 완료되었습니다!");
        System.out.println("📊 총 " + restaurantRepository.count() + "개의 식당, " 
                         + menuRepository.count() + "개의 메뉴, "
                         + lectureRepository.count() + "개의 강의, "
                         + postRepository.count() + "개의 게시글이 생성되었습니다.");
    }
    
    /**
     * 학식 메뉴 데이터 로딩
     */
    private void loadCampusMenuData() {
        // 1. 식당 데이터 생성
        Restaurant studentRestaurant = new Restaurant(null, "학생식당");
        Restaurant facultyRestaurant = new Restaurant(null, "교직원식당");
        Restaurant dormitoryRestaurant = new Restaurant(null, "기숙사식당");
        Restaurant foodCourtRestaurant = new Restaurant(null, "푸드코트");
        
        studentRestaurant = restaurantRepository.save(studentRestaurant);
        facultyRestaurant = restaurantRepository.save(facultyRestaurant);
        dormitoryRestaurant = restaurantRepository.save(dormitoryRestaurant);
        foodCourtRestaurant = restaurantRepository.save(foodCourtRestaurant);
        
        System.out.println("✅ 식당 데이터 생성 완료");
        
        // 2. 오늘 날짜의 메뉴 데이터 생성
        LocalDate today = LocalDate.now();
        
        // 학생식당 메뉴 (오늘 날짜)
        menuRepository.save(new Menu(null, today, "조식", "소고기무국", 4000, studentRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "중식", "눈꽃치즈돈까스 & 미니우동", 5500, studentRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "석식", "참치마요덮밥", 4500, studentRestaurant.getId()));
        
        // 교직원식당 메뉴
        menuRepository.save(new Menu(null, today, "중식", "김치찌개+밥+샐러드+과일", 6000, facultyRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "석식", "삼겹살+쌈채소+된장찌개+밥", 7000, facultyRestaurant.getId()));
        
        // 기숙사식당 메뉴
        menuRepository.save(new Menu(null, today, "조식", "시리얼+우유+바나나", 2500, dormitoryRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "중식", "카레라이스+돈까스+샐러드", 4500, dormitoryRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "석식", "라면+김밥+단무지", 4000, dormitoryRestaurant.getId()));
        
        // 푸드코트 메뉴
        menuRepository.save(new Menu(null, today, "중식", "짜장면+탕수육 세트", 5500, foodCourtRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "중식", "김치찌개+밥+계란말이", 4500, foodCourtRestaurant.getId()));
        menuRepository.save(new Menu(null, today, "석식", "치킨마요덮밥+된장국", 5000, foodCourtRestaurant.getId()));
        
        // 내일 날짜의 메뉴도 추가 (테스트용)
        LocalDate tomorrow = today.plusDays(1);
        menuRepository.save(new Menu(null, tomorrow, "중식", "불고기+밥+미역국", 5500, studentRestaurant.getId()));
        menuRepository.save(new Menu(null, tomorrow, "중식", "갈비탕+밥+김치", 6500, facultyRestaurant.getId()));
        menuRepository.save(new Menu(null, tomorrow, "석식", "햄버거+감자튀김+콜라", 5000, dormitoryRestaurant.getId()));
        
        System.out.println("✅ 메뉴 데이터 생성 완료");
    }
    
    /**
     * 시간표 데이터 로딩
     */
    private void loadScheduleData() {
        // 현재 날짜와 시간 가져오기
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        DayOfWeek dayOfWeek = today.getDayOfWeek();
        
        // 오늘 요일을 한글로 변환
        String todayKorean = getDayOfWeekKorean(dayOfWeek);
        
        // 1시간 후 시간 계산 (예: 현재 14:30 -> 15:30)
        LocalTime oneHourLater = now.plusHours(1);
        LocalTime twoHoursLater = oneHourLater.plusHours(1).plusMinutes(30);
        
        // 시간 포맷 (HH:mm)
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        String startTime = oneHourLater.format(formatter);
        String endTime = twoHoursLater.format(formatter);
        String timeRange = startTime + "-" + endTime;
        
        // ⭐ 오늘 + 1시간 후에 시작하는 강의 추가 (홈 화면 '다음 수업' 위젯용)
        lectureRepository.save(new Lecture(
            null, 
            "알고리즘", 
            "최지훈 교수", 
            todayKorean, 
            timeRange, 
            "공학관 301"
        ));
        
        System.out.println("✅ [홈 화면용] 오늘(" + todayKorean + "요일) " + startTime + " 시작 '다음 수업' 생성 완료");
        
        // 월요일 강의
        lectureRepository.save(new Lecture(null, "자료구조", "김철수 교수", "월", "09:00-10:30", "공학관 301"));
        lectureRepository.save(new Lecture(null, "웹프로그래밍", "이영희 교수", "월", "10:30-12:00", "공학관 405"));
        lectureRepository.save(new Lecture(null, "데이터베이스", "박민수 교수", "월", "13:00-14:30", "IT관 201"));
        
        // 화요일 강의
        lectureRepository.save(new Lecture(null, "채플", "목회실", "화", "10:00-10:50", "대강당"));
        lectureRepository.save(new Lecture(null, "알고리즘", "최지훈 교수", "화", "14:00-15:30", "공학관 302"));
        lectureRepository.save(new Lecture(null, "영어회화", "Smith 교수", "화", "15:30-17:00", "어학관 101"));
        
        // 수요일 강의
        lectureRepository.save(new Lecture(null, "운영체제", "정대성 교수", "수", "09:00-10:30", "IT관 305"));
        lectureRepository.save(new Lecture(null, "소프트웨어공학", "김미래 교수", "수", "13:00-14:30", "공학관 401"));
        lectureRepository.save(new Lecture(null, "네트워크", "홍길동 교수", "수", "14:30-16:00", "IT관 202"));
        
        // 목요일 강의
        lectureRepository.save(new Lecture(null, "인공지능", "오지혜 교수", "목", "10:00-12:00", "AI연구소"));
        lectureRepository.save(new Lecture(null, "컴퓨터구조", "서동욱 교수", "목", "13:00-14:30", "공학관 303"));
        
        // 금요일 강의
        lectureRepository.save(new Lecture(null, "캡스톤디자인", "장현우 교수", "금", "09:00-12:00", "프로젝트실"));
        lectureRepository.save(new Lecture(null, "모바일프로그래밍", "안수진 교수", "금", "13:00-15:00", "공학관 502"));
        
        System.out.println("✅ 시간표 데이터 생성 완료");
    }
    
    /**
     * 영문 요일을 한글 요일로 변환
     */
    private String getDayOfWeekKorean(DayOfWeek dayOfWeek) {
        switch (dayOfWeek) {
            case MONDAY:
                return "월";
            case TUESDAY:
                return "화";
            case WEDNESDAY:
                return "수";
            case THURSDAY:
                return "목";
            case FRIDAY:
                return "금";
            case SATURDAY:
                return "토";
            case SUNDAY:
                return "일";
            default:
                return "";
        }
    }
    
    /**
     * 커뮤니티 데이터 로딩
     */
    private void loadCommunityData() {
        LocalDateTime now = LocalDateTime.now();
        
        // ⭐ 홈 화면용 최신 공지사항 (시간 간격을 두고 생성)
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "셔틀버스 시간표 변경 안내", 
            "12월 27일부터 셔틀버스 운행 시간이 변경됩니다. 오전 첫차: 7:30 → 7:00으로 앞당겨집니다.",
            "학생지원팀",
            null,
            null,
            null,
            now.minusMinutes(5) // 5분 전
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "중간고사 기간 도서관 24시간 개방", 
            "중간고사 기간(12/28 ~ 1/10) 동안 중앙도서관이 24시간 개방됩니다. 열람실 좌석은 선착순입니다.",
            "도서관",
            null,
            null,
            null,
            now.minusMinutes(30) // 30분 전
        ));
        
        postRepository.save(new Post(
            null, 
            Category.BOOK, 
            "오늘의 학식 메뉴 추천", 
            "학생식당 중식 메뉴 '눈꽃치즈돈까스'가 정말 맛있다고 합니다! 미니우동도 함께 나와요.",
            "맛집탐방러",
            null,
            null,
            null,
            now.minusHours(1) // 1시간 전
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "겨울방학 현장실습 모집 안내", 
            "겨울방학 기간 IT 기업 현장실습 프로그램에 참여할 학생을 모집합니다. 신청 기간: 12/26 ~ 1/5",
            "취업지원센터",
            null,
            null,
            null,
            now.minusHours(2) // 2시간 전
        ));
        
        // 기존 TAXI 카테고리
        postRepository.save(new Post(
            null, 
            Category.TAXI, 
            "천안역 4명 모집", 
            "오늘 저녁 7시 천안역 가시는 분 계신가요? 택시비 나눠내실 분 3명 더 구합니다!",
            "김택시",
            4000,
            2,
            4,
            now.minusHours(3)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TAXI, 
            "신세계백화점 가실 분", 
            "내일 오후 2시쯤 신세계 갈 예정인데 같이 가실 분 계신가요? 1인당 3000원 정도 예상됩니다.",
            "이쇼핑",
            3000,
            1,
            4,
            now.minusHours(5)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TAXI, 
            "아산역 급구!", 
            "지금 당장 아산역 가야하는데 같이 가실 분! 바로 출발합니다.",
            "박급해",
            5000,
            1,
            3,
            now.minusHours(6)
        ));
        
        // BOOK 카테고리
        postRepository.save(new Post(
            null, 
            Category.BOOK, 
            "자바의 정석 팝니다", 
            "자바의 정석 3판입니다. 거의 새 책이고 필기 없어요. 직거래 선호합니다.",
            "최자바",
            15000,
            null,
            null,
            now.minusHours(8)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.BOOK, 
            "운영체제 공룡책 삽니다", 
            "운영체제 공룡책 (Operating System Concepts) 구합니다. 상태 좋은 것으로 부탁드려요.",
            "정운영",
            20000,
            null,
            null,
            now.minusHours(10)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.BOOK, 
            "토익 교재 일괄 판매", 
            "토익 RC/LC 교재 세트로 팝니다. 990점 찍고 이제 안 봐서 팔아요~ 정가 5만원인데 2만원에 드립니다.",
            "김토익",
            20000,
            null,
            null,
            now.minusHours(12)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.BOOK, 
            "알고리즘 문제해결전략 팝니다", 
            "프로그래밍 대회에서 배우는 알고리즘 문제해결전략 (종만북) 팝니다. 상태 양호합니다.",
            "박알고",
            25000,
            null,
            null,
            now.minusHours(15)
        ));
        
        // TEAM 카테고리
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "프론트엔드 개발자 구합니다", 
            "캡스톤 프로젝트 팀원 모집합니다. React 다루실 수 있는 프론트엔드 개발자 1명 필요해요!",
            "이팀장",
            null,
            3,
            4,
            now.minusHours(18)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "공모전 같이 하실 분", 
            "IT 관련 공모전 함께 준비하실 분 찾습니다. 기획이나 개발 모두 환영합니다!",
            "송공모",
            null,
            2,
            5,
            now.minusHours(20)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "스터디 그룹 모집", 
            "알고리즘 스터디원 모집합니다. 매주 화/목 저녁 7시에 만나서 문제 풀고 토론해요. 백준 골드 이상 환영!",
            "장스터디",
            null,
            4,
            6,
            now.minusHours(24)
        ));
        
        postRepository.save(new Post(
            null, 
            Category.TEAM, 
            "해커톤 팀원 구해요", 
            "다음 달 해커톤 참가할 팀원 찾습니다. 백엔드 개발자 1명, 디자이너 1명 필요합니다!",
            "최해커",
            null,
            2,
            4,
            now.minusHours(30)
        ));
        
        System.out.println("✅ 커뮤니티 데이터 생성 완료 (최신 글 포함)");
    }
}
