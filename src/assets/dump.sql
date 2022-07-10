CREATE TABLE IF NOT EXISTS playerstable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    ability_level TEXT NOT NULL    
);
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (1, "Aidan", "Batchelor", "Medium");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (1, "Naomi", "Smith", "Medium");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (1, "Joe", "Bloggs", "High");
INSERT or IGNORE INTO playerstable(id, first_name, last_name, ability_level) VALUES (1, "Jane", "Doe", "Low");
