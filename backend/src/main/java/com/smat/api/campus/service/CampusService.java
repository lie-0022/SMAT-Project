package com.smat.api.campus.service;

import com.smat.api.campus.domain.Menu;
import com.smat.api.campus.domain.Restaurant;
import com.smat.api.campus.dto.MenuResponseDto;
import com.smat.api.campus.repository.MenuRepository;
import com.smat.api.campus.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class CampusService {
    
    private final MenuRepository menuRepository;
    private final RestaurantRepository restaurantRepository;
    
    public CampusService(MenuRepository menuRepository, RestaurantRepository restaurantRepository) {
        this.menuRepository = menuRepository;
        this.restaurantRepository = restaurantRepository;
    }
    
    /**
     * 오늘 날짜의 전체 메뉴를 조회합니다.
     * 
     * @return 오늘의 메뉴 리스트
     */
    public List<MenuResponseDto> getTodayMenus() {
        LocalDate today = LocalDate.now();
        return getMenusByDate(today);
    }
    
    /**
     * 특정 날짜의 메뉴를 조회합니다.
     * 
     * @param date 조회할 날짜
     * @return 해당 날짜의 메뉴 리스트
     */
    public List<MenuResponseDto> getMenusByDate(LocalDate date) {
        // 메뉴 조회
        List<Menu> menus = menuRepository.findByDate(date);
        
        // 식당 정보를 캐싱하기 위한 Map
        Map<Long, String> restaurantCache = new HashMap<>();
        
        // DTO로 변환
        List<MenuResponseDto> response = new ArrayList<>();
        for (Menu menu : menus) {
            // 식당 이름 조회 (캐시 활용)
            String restaurantName = restaurantCache.get(menu.getRestaurantId());
            if (restaurantName == null) {
                Restaurant restaurant = restaurantRepository.findById(menu.getRestaurantId())
                        .orElse(null);
                if (restaurant != null) {
                    restaurantName = restaurant.getName();
                    restaurantCache.put(menu.getRestaurantId(), restaurantName);
                } else {
                    restaurantName = "알 수 없는 식당";
                }
            }
            
            // DTO 생성
            MenuResponseDto dto = new MenuResponseDto(
                menu.getId(),
                menu.getDate(),
                menu.getTimeType(),
                menu.getMenuName(),
                menu.getPrice(),
                restaurantName
            );
            response.add(dto);
        }
        
        return response;
    }
    
    /**
     * 특정 날짜와 시간대의 메뉴를 조회합니다.
     * 
     * @param date 조회할 날짜
     * @param timeType 시간대 (조식/중식/석식)
     * @return 해당 조건의 메뉴 리스트
     */
    public List<MenuResponseDto> getMenusByDateAndTimeType(LocalDate date, String timeType) {
        List<Menu> menus = menuRepository.findByDateAndTimeType(date, timeType);
        
        Map<Long, String> restaurantCache = new HashMap<>();
        List<MenuResponseDto> response = new ArrayList<>();
        
        for (Menu menu : menus) {
            String restaurantName = restaurantCache.get(menu.getRestaurantId());
            if (restaurantName == null) {
                Restaurant restaurant = restaurantRepository.findById(menu.getRestaurantId())
                        .orElse(null);
                if (restaurant != null) {
                    restaurantName = restaurant.getName();
                    restaurantCache.put(menu.getRestaurantId(), restaurantName);
                } else {
                    restaurantName = "알 수 없는 식당";
                }
            }
            
            MenuResponseDto dto = new MenuResponseDto(
                menu.getId(),
                menu.getDate(),
                menu.getTimeType(),
                menu.getMenuName(),
                menu.getPrice(),
                restaurantName
            );
            response.add(dto);
        }
        
        return response;
    }
}
