CREATE TABLE players (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    position    VARCHAR(20),
    team        VARCHAR(50),
    age         INT
);

CREATE TABLE career_stats (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    player_id   INT NOT NULL,
    season_year INT NOT NULL,
    stat_name   VARCHAR(50) NOT NULL,
    stat_value  DECIMAL(10, 3),
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
