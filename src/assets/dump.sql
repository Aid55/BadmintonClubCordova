CREATE TABLE IF NOT EXISTS playerstable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    ability_level TEXT NOT NULL    
);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (1, "Aidan", "Batchelor", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (2, "Naomi", "Smith", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (3, "Joe", "Bloggs", "Experienced");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (4, "Jane", "Doe", "Beginner");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (5, "Rosie", "Smith", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (6, "Simon", "Johnson", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (7, "Nathan", "Hall", "Experienced");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (8, "Susan", "Richard", "Beginner");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (9, "Ben", "Green", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (10, "Sharon", "Stevens", "Intermediate");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (11, "Karen", "Bell", "Experienced");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (12, "John", "Bury", "Beginner");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (0, "Empty", "Space", "Beginner");

CREATE TABLE IF NOT EXISTS credentialstable(
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
INSERT or IGNORE INTO credentialstable(username, password) VALUES ("aidan", "password");

CREATE TABLE IF NOT EXISTS matchestable(
    id INTEGER PRIMARY KEY,
    player1_id INTEGER,
    player2_id INTEGER,
    player3_id INTEGER,
    player4_id INTEGER,
    team1_score INTEGER NOT NULL,
    team2_score INTEGER NOT NULL,
    FOREIGN KEY (player1_id) REFERENCES playerstable(id),
    FOREIGN KEY (player2_id) REFERENCES playerstable(id),
    FOREIGN KEY (player3_id) REFERENCES playerstable(id),
    FOREIGN KEY (player4_id) REFERENCES playerstable(id)
);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (1, 1, 2, 3, 4, 0, 0);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (2, 5, 6, 7, 8, 21, 19);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (3, 9, 10, 11, 12, 5, 21);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (4, 0, 0, 0, 0, 0, 0);