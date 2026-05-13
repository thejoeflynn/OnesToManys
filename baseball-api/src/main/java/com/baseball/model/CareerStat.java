package com.baseball.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

// @Entity tells Spring/Hibernate this class maps to the career_stats table.
// Each instance of CareerStat is one row — one stat, for one season, for one player.
@Entity
@Table(name = "career_stats")
public class CareerStat {

    // Auto-generated primary key, same as Player
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @ManyToOne means many stats can belong to one player — this is the "many" side
    // of the one-to-many relationship.
    // @JoinColumn tells Hibernate the foreign key column in this table is called "player_id".
    // @JsonIgnore hides the full Player object from the JSON response to avoid
    // an infinite loop (CareerStat → Player → CareerStat → Player...).
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    @JsonIgnore
    private Player player;

    // The year this stat entry belongs to (e.g. 2026)
    private int seasonYear;

    // The name of the stat (e.g. "batting_avg", "home_runs")
    private String statName;

    // The value of the stat (e.g. 0.281, 10)
    private double statValue;

    // Since the full player object is hidden by @JsonIgnore above,
    // this method exposes just the player's ID in the JSON response as "player_id".
    // That way whoever calls the API can still see which player this stat belongs to.
    @JsonProperty("player_id")
    public Long getPlayerId() {
        return player != null ? player.getId() : null;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Player getPlayer() { return player; }
    public void setPlayer(Player player) { this.player = player; }

    public int getSeasonYear() { return seasonYear; }
    public void setSeasonYear(int seasonYear) { this.seasonYear = seasonYear; }

    public String getStatName() { return statName; }
    public void setStatName(String statName) { this.statName = statName; }

    public double getStatValue() { return statValue; }
    public void setStatValue(double statValue) { this.statValue = statValue; }
}
