package com.baseball.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

// @Entity tells Spring/Hibernate that this class maps to a database table.
// Every instance of Player represents one row in the players table.
@Entity
@Table(name = "players") // maps this class to the "players" table in the database
public class Player {

    // @Id marks this as the primary key column
    // @GeneratedValue means the database auto-assigns the ID — we never set it manually
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // These fields map directly to columns in the players table.
    // Java naming (camelCase) gets automatically converted to SQL naming (snake_case),
    // so firstName becomes first_name in the database.
    private String firstName;
    private String lastName;
    private String position;
    private String team;
    private int age;

    // @OneToMany means one player can have many career stats.
    // mappedBy = "player" tells Hibernate that the CareerStat class owns the relationship
    // (via its "player" field), so don't create a separate join table.
    // cascade = ALL means if you delete a player, all their stats get deleted too.
    // fetch = LAZY means don't load the stats from the database unless we specifically ask for them.
    // @JsonIgnore prevents the stats list from being included in the JSON response,
    // which avoids an infinite loop (Player → Stats → Player → Stats...).
    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CareerStat> stats;

    // Getters and setters — these are how Java reads and writes each field.
    // Spring uses these automatically when converting to/from JSON.
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public List<CareerStat> getStats() { return stats; }
    public void setStats(List<CareerStat> stats) { this.stats = stats; }
}
