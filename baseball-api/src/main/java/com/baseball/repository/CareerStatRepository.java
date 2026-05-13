package com.baseball.repository;

import com.baseball.model.CareerStat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Same idea as PlayerRepository — JpaRepository gives us basic CRUD for free.
public interface CareerStatRepository extends JpaRepository<CareerStat, Long> {

    // This is a custom query method. Spring reads the method name and automatically
    // figures out what SQL to run. "findByPlayer_Id" translates to:
    // SELECT * FROM career_stats WHERE player_id = ?
    // The underscore in Player_Id tells Spring to look inside the Player object for its Id field.
    List<CareerStat> findByPlayer_Id(Long playerId);
}
