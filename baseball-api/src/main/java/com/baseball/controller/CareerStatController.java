package com.baseball.controller;

import com.baseball.model.CareerStat;
import com.baseball.model.Player;
import com.baseball.repository.CareerStatRepository;
import com.baseball.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/players/{playerId}/stats")
public class CareerStatController {

    @Autowired
    private CareerStatRepository careerStatRepository;

    @Autowired
    private PlayerRepository playerRepository;

    // GET all stats for a player
    @GetMapping
    public List<CareerStat> getStatsByPlayer(@PathVariable Long playerId) {
        return careerStatRepository.findByPlayer_Id(playerId);
    }

    // GET one stat entry
    @GetMapping("/{statId}")
    public Optional<CareerStat> getStatById(@PathVariable Long playerId, @PathVariable Long statId) {
        return careerStatRepository.findById(statId);
    }

    // POST add a stat entry for a player
    @PostMapping
    public CareerStat createStat(@PathVariable Long playerId, @RequestBody CareerStat stat) {
        Player player = playerRepository.findById(playerId).orElseThrow();
        stat.setPlayer(player);
        return careerStatRepository.save(stat);
    }

    // PUT update a stat entry
    @PutMapping("/{statId}")
    public CareerStat updateStat(@PathVariable Long playerId, @PathVariable Long statId, @RequestBody CareerStat updatedStat) {
        Player player = playerRepository.findById(playerId).orElseThrow();
        updatedStat.setId(statId);
        updatedStat.setPlayer(player);
        return careerStatRepository.save(updatedStat);
    }

    // DELETE a stat entry
    @DeleteMapping("/{statId}")
    public void deleteStat(@PathVariable Long playerId, @PathVariable Long statId) {
        careerStatRepository.deleteById(statId);
    }
}
