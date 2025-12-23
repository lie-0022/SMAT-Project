package com.smat.api.campus.repository;

import com.smat.api.campus.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    /**
     * 식당명으로 조회
     */
    Restaurant findByName(String name);
}
