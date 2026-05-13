package com.baseball.repository;

import com.baseball.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

// A repository is the layer that talks directly to the database.
// By extending JpaRepository, we get a bunch of database methods for free
// without writing any SQL — things like findAll(), findById(), save(), deleteById().
// The two types in the <> tell it what table to work with (Player)
// and what type the primary key is (Long).
public interface PlayerRepository extends JpaRepository<Player, Long> {
    // No extra methods needed here — JpaRepository already covers all basic CRUD.
}
