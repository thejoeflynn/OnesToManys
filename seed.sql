INSERT INTO players (first_name, last_name, position, team, age) VALUES
('JT', 'Realmuto', 'C', 'Phillies', '35'),
('Bryce', 'Harper', '1B', 'Phillies', '33'),
('Bryson', 'Stott', '2B', 'Phillies', '28'),
('Trea', 'Turner', 'SS', 'Phillies', '33'),
('Alec', 'Bohm', '3B', 'Phillies', '29'),
('Brandon', 'Marsh', 'LF', 'Phillies', '28'),
('Justin', 'Crawford', 'CF', 'Phillies', '22'),
('Adolis', 'Garcia', 'RF', 'Phillies', '33'),
('Kyle', 'Schwarber', 'DH', 'Phillies', '33'),
('Drake', 'Baldwin', 'C', 'Braves', '25'),
('Matt', 'Olson', '1B', 'Braves', '32'),
('Ozzie', 'Albies', '2B', 'Braves', '29'),
('Mauricio', 'Dubon', 'SS', 'Braves', '31'),
('Austin', 'Riley', '3B', 'Braves', '25'),
('Mike', 'Yastrzemski', 'LF', 'Braves', '35'),
('Michael', 'Harris II', 'CF', 'Braves', '25'),
('Ronald', 'Acuna Jr.', '3B', 'Braves', '28'),
('Dominic', 'Smith', 'DH', 'Braves', '31'),
('Keibert', 'Ruiz', 'C', 'Nationals', '27');


INSERT INTO career_stats (player_id, season_year, stat_name, stat_value) VALUES
-- JT Realmuto (player_id = 1)
(1, 2026, 'batting_avg', .247),
(1, 2026, 'rbis', 8),
(1, 2026, 'home_runs', 1),
(1, 2026, 'stolen_bases', 0),

-- Bryce Harper (player_id = 2)
(2, 2026, 'batting_avg', .281),
(2, 2026, 'rbis', 24),
(2, 2026, 'home_runs', 10),
(2, 2026, 'stolen_bases', 2),

-- Bryson Stott (player_id = 3)
(3, 2026, 'batting_avg', .213),
(3, 2026, 'rbis', 15),
(3, 2026, 'home_runs', 3),
(3, 2026, 'stolen_bases', 7),

-- Trea Turner (player_id = 4)
(4, 2026, 'batting_avg', .240),
(4, 2026, 'rbis', 13),
(4, 2026, 'home_runs', 4),
(4, 2026, 'stolen_bases', 4),

-- Alec Bohm (player_id = 5)
(5, 2026, 'batting_avg', .180),
(5, 2026, 'rbis', 20),
(5, 2026, 'home_runs', 3),
(5, 2026, 'stolen_bases', 0),

-- Brandon Marsh (player_id = 6)
(6, 2026, 'batting_avg', .353),
(6, 2026, 'rbis', 21),
(6, 2026, 'home_runs', 4),
(6, 2026, 'stolen_bases', 3),

-- Justin Crawford (player_id = 7)
(7, 2026, 'batting_avg', .276),
(7, 2026, 'rbis', 10),
(7, 2026, 'home_runs', 1),
(7, 2026, 'stolen_bases', 3),

-- Adolis Garcia (player_id = 8)
(8, 2026, 'batting_avg', .240),
(8, 2026, 'rbis', 13),
(8, 2026, 'home_runs', 4),
(8, 2026, 'stolen_bases', 1),

-- Kyle Schwarber (player_id = 9)
(9, 2026, 'batting_avg', .227),
(9, 2026, 'rbis', 27),
(9, 2026, 'home_runs', 16),
(9, 2026, 'stolen_bases', 0),

-- Drake Baldwin (player_id = 10)
(11, 2026, 'batting_avg', .250),
(11, 2026, 'rbis', 5),
(11, 2026, 'home_runs', 0),
(11, 2026, 'stolen_bases', 0),

-- Matt Olson (player_id = 12)
(12, 2026, 'batting_avg', .275),
(12, 2026, 'rbis', 30),
(12, 2026, 'home_runs', 12),
(12, 2026, 'stolen_bases', 0),

-- Ozzie Albies (player_id = 13)
(13, 2026, 'batting_avg', .260),
(13, 2026, 'rbis', 18),
(13, 2026, 'home_runs', 5),
(13, 2026, 'stolen_bases', 10),

-- Mauricio Dubon (player_id = 14)
(14, 2026, 'batting_avg', .220),
(14, 2026, 'rbis', 8),
(14, 2026, 'home_runs', 2),
(14, 2026, 'stolen_bases', 4),

-- Austin Riley (player_id = 15)
(15, 2026, 'batting_avg', .265),
(15, 2026, 'rbis', 25),
(15, 2026, 'home_runs', 10),
(15, 2026, 'stolen_bases', 1),

-- Mike Yastrzemski (player_id = 16)
(16, 2026, 'batting_avg', .240),
(16, 2026, 'rbis', 15),
(16, 2026, 'home_runs', 5),
(16, 2026, 'stolen_bases', 0),

-- Michael Harris II (player_id = 17)
(17, 2026, 'batting_avg', .280),
(17, 2026, 'rbis', 20),
(17, 2026, 'home_runs', 8),
(17, 2026, 'stolen_bases', 5),

-- Ronald Acuna Jr. (player_id = 18)
(18, 2026, 'batting_avg', .290),
(18, 2026, 'rbis', 35),
(18, 2026, 'home_runs', 15),
(18, 2026, 'stolen_bases', 10),

-- Dominic Smith (player_id = 19)
(19, 2026, 'batting_avg', .250),
(19, 2026, 'rbis', 18),
(19, 2026, 'home_runs', 7),
(19, 2026, 'stolen_bases', 0),

-- Keibert Ruiz (player_id = 20)
(20, 2026, 'batting_avg', .205),
(20, 2026, 'rbis', 13),
(20, 2026, 'home_runs', 2),
(20, 2026, 'stolen_bases', 0);

