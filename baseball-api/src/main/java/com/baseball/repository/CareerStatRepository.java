package com.baseball.repository;

import com.baseball.model.CareerStat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CareerStatRepository extends JpaRepository<CareerStat, Long> {
    List<CareerStat> findByPlayer_Id(Long playerId);
}
