CREATE TABLE IF NOT EXISTS playerstable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    ability_level TEXT NOT NULL,
    assigned_to_match BOOLEAN    
);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (1, "Aidan", "Batchelor", "Intermediate", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (2, "Naomi", "Smith", "Intermediate", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (3, "Joe", "Bloggs", "Experienced", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (4, "Jane", "Doe", "Beginner", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (5, "Rosie", "Smith", "Intermediate", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (6, "Simon", "Johnson", "Intermediate", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (7, "Nathan", "Hall", "Experienced", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (8, "Susan", "Richard", "Beginner", 1);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (9, "Ben", "Green", "Intermediate", 0);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (10, "Sharon", "Stevens", "Intermediate", 0);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (11, "Karen", "Bell", "Experienced", 0);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (12, "John", "Bury", "Beginner", 0);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level, assigned_to_match) VALUES (0, "Empty", "Space", "Beginner", 0);

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
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (1, 1, 2, 3, 4, 21, 19);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (2, 0, 0, 0, 0, 0, 0);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (3, 5, 6, 7, 8, 5, 21);
INSERT or IGNORE INTO matchestable(id, player1_id, player2_id, player3_id, player4_id, team1_score, team2_score) VALUES (4, 0, 0, 0, 0, 0, 0);

CREATE TABLE IF NOT EXISTS prevmatchestable(
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