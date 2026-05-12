package com.baseball.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "career_stats")
public class CareerStat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    @JsonIgnore
    private Player player;

    private int seasonYear;
    private String statName;
    private double statValue;

    @JsonProperty("player_id")
    public Long getPlayerId() {
        return player != null ? player.getId() : null;
    }

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
