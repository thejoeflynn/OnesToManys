package com.baseball.controller;

import com.baseball.model.Player;
import com.baseball.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// @RestController tells Spring this class handles incoming HTTP requests
// and that every method returns data (as JSON), not a web page.
// @RequestMapping("/players") means all endpoints in this class start with /players.
@RestController
@RequestMapping("/players")
public class PlayerController {

    // @Autowired tells Spring to automatically inject the PlayerRepository here.
    // We don't create it manually — Spring finds it and hands it to us.
    @Autowired
    private PlayerRepository playerRepository;

    // Handles: GET /players
    // Returns a list of every player in the database.
    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    // Handles: GET /players/{id}
    // Returns one player by their ID. The {id} in the URL gets pulled out
    // by @PathVariable and passed into the method.
    // Optional means it might return a player, or it might return nothing if the ID doesn't exist.
    @GetMapping("/{id}")
    public Optional<Player> getPlayerById(@PathVariable Long id) {
        return playerRepository.findById(id);
    }

    // Handles: POST /players
    // Creates a new player. The player data comes in as JSON in the request body,
    // and @RequestBody converts it into a Player object automatically.
    // save() inserts it into the database and returns the saved player (with its new ID).
    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerRepository.save(player);
    }

    // Handles: PUT /players/{id}
    // Updates an existing player. We take the ID from the URL and the new data from the body,
    // set the ID on the updated object so Hibernate knows which row to overwrite,
    // then save it. save() updates if the ID already exists.
    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable Long id, @RequestBody Player updatedPlayer) {
        updatedPlayer.setId(id);
        return playerRepository.save(updatedPlayer);
    }

    // Handles: DELETE /players/{id}
    // Deletes a player by ID. Because of the CASCADE setting on the Player model,
    // all of that player's career stats get deleted automatically too.
    // Returns nothing (void) — a successful delete just sends back a 200 with no body.
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {
        playerRepository.deleteById(id);
    }
}
