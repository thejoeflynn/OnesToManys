package com.baseball.controller;

import com.baseball.model.CareerStat;
import com.baseball.model.Player;
import com.baseball.repository.CareerStatRepository;
import com.baseball.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// All endpoints here are nested under /players/{playerId}/stats.
// This reflects the one-to-many relationship — stats belong to a player,
// so the URL structure shows that hierarchy.
@RestController
@RequestMapping("/players/{playerId}/stats")
public class CareerStatController {

    @Autowired
    private CareerStatRepository careerStatRepository;

    // We also need the PlayerRepository here so we can look up the player
    // when creating or updating a stat entry.
    @Autowired
    private PlayerRepository playerRepository;

    // Handles: GET /players/{playerId}/stats
    // Returns all stat entries for a specific player.
    // Uses our custom repository method which runs: SELECT * FROM career_stats WHERE player_id = ?
    @GetMapping
    public List<CareerStat> getStatsByPlayer(@PathVariable Long playerId) {
        return careerStatRepository.findByPlayer_Id(playerId);
    }

    // Handles: GET /players/{playerId}/stats/{statId}
    // Returns one specific stat entry by its ID.
    // We receive both playerId and statId from the URL, but only need statId here
    // since stat IDs are unique across the whole table.
    @GetMapping("/{statId}")
    public Optional<CareerStat> getStatById(@PathVariable Long playerId, @PathVariable Long statId) {
        return careerStatRepository.findById(statId);
    }

    // Handles: POST /players/{playerId}/stats
    // Creates a new stat entry for a player.
    // We first look up the player to make sure they exist, then attach them
    // to the stat object before saving. This sets the foreign key (player_id) in the database.
    // orElseThrow() will throw an error if no player is found with that ID.
    @PostMapping
    public CareerStat createStat(@PathVariable Long playerId, @RequestBody CareerStat stat) {
        Player player = playerRepository.findById(playerId).orElseThrow();
        stat.setPlayer(player);
        return careerStatRepository.save(stat);
    }

    // Handles: PUT /players/{playerId}/stats/{statId}
    // Updates an existing stat entry. Same idea as updatePlayer —
    // we set the ID so Hibernate knows which row to overwrite, then save.
    @PutMapping("/{statId}")
    public CareerStat updateStat(@PathVariable Long playerId, @PathVariable Long statId, @RequestBody CareerStat updatedStat) {
        Player player = playerRepository.findById(playerId).orElseThrow();
        updatedStat.setId(statId);
        updatedStat.setPlayer(player);
        return careerStatRepository.save(updatedStat);
    }

    // Handles: DELETE /players/{playerId}/stats/{statId}
    // Deletes one specific stat entry by its ID.
    // We receive playerId from the URL (required by the route pattern) but only use statId here.
    @DeleteMapping("/{statId}")
    public void deleteStat(@PathVariable Long playerId, @PathVariable Long statId) {
        careerStatRepository.deleteById(statId);
    }
}
