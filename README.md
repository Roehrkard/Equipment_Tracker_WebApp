# Equipment Tracker
A Mock Webapp.

## Tech Stack
- Java Spring boot
- Angular
- MySql
- Docker (todo) 

### Running steps
1. Open Terminal and access a MySQL instance
2. Copy and paste all the MySQL Database Commands
3. Update application.properties with MySQL URL, username, password
4. Open Terminal and navigate to equipment-tracker directory
5. run mvn spring-boot:run
6. Open another terminal and navigate to equipment-tracker/equipment-tracker-frontend
7. run ng serve
8. visit http://localhost:4200/login
9. Username = Any username in the Users table "DanielSmith"
10. Pin = 12341234 

### MySQl Database Commands

CREATE DATABASE equipment_tracker_db;
USE equipment_tracker_db;

CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(255),
  hashed_pin VARCHAR(255)
);

INSERT INTO users (id, username, hashed_pin) VALUES 
(47, 'DanielSmith', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS'),
(48, 'SophiaGarcia', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS'),
(49, 'AhmedAli', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS'),
(50, 'AminaKhan', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS'),
(51, 'DavidJohnson', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS'),
(52, 'MiaNguyen', '$2a$12$QjkhB0PPF3PnUUa1BrZrDuDhaMBfFfesIk1REmTsIZ/UTLdJ3paSS');

CREATE TABLE equipment (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  status VARCHAR(100),
  description TEXT,
  qty INT
);

INSERT INTO equipment (id, name, status, description, qty) VALUES 
(68, 'Navigation Chart', 'Available', 'Marine navigation chart for sea routes.', 5),
(69, 'Handheld GPS', 'Available', 'Portable handheld GPS navigator for naval use.', 5),
(70, 'Diving Mask', 'Available', 'Standard diving mask for underwater operations.', 7),
(71, 'Inflatable Life Jacket', 'Available', 'Compact inflatable life jacket for safety at sea.', 2),
(72, 'Naval Flashlight', 'Available', 'Waterproof naval flashlight with LED technology.', 6),
(73, 'Naval Multi-Tool', 'Available', 'Compact multi-tool with various functions for sailors.', 4),
(74, 'Compact First Aid Kit', 'Available', 'Small first aid kit for minor injuries on naval vessels.', 7),
(75, 'Marine Whistle', 'Available', 'Marine whistle for signaling and communication.', 9),
(76, 'Folding Knife', 'Available', 'Folding knife with stainless steel blade for sailors.', 7),
(77, 'Survival Blanket', 'Available', 'Compact survival blanket for emergency situations.', 3),
(78, 'Miniature Flag Set', 'Unavailable', 'Set of miniature flags for signaling on naval vessels.', 0),
(79, 'Compact Naval Compass', 'Available', 'Compact magnetic compass for navigation.', 6);


CREATE TABLE transaction (
  transaction_id INT PRIMARY KEY,
  transaction_date DATETIME,
  user_id INT,
  username VARCHAR(255),
  equipment_id INT,
  equipment_name VARCHAR(255),
  quantity INT,
  status VARCHAR(100)
);

INSERT INTO transaction (transaction_id, transaction_date, user_id, username, equipment_id, equipment_name, quantity, status) VALUES 
(2, '2023-12-27 23:41:39', 47, 'DanielSmith', 75, 'Marine Whistle', 3, 'Checked Out'),
(3, '2023-12-27 23:41:39', 51, 'DavidJohnson', 78, 'Miniature Flag Set', 12, 'Checked Out'),
(4, '2023-12-27 23:56:48', 49, 'AhmedAli', 79, 'Compact Naval Compass', 3, 'Checked Out'),
(71, '2024-01-02 12:23:58', 52, 'MiaNguyen', 77, 'Survival Blanket', 3, 'Checked Out'),
(72, '2024-01-02 12:23:58', 52, 'MiaNguyen', 76, 'Folding Knife', 2, 'Checked Out'),
(73, '2024-01-02 12:24:28', 48, 'SophiaGarcia', 79, 'Compact Naval Compass', 2, 'Checked Out'),
(74, '2024-01-02 12:24:28', 48, 'SophiaGarcia', 77, 'Survival Blanket', 1, 'Checked Out'),
(75, '2024-01-02 12:24:59', 50, 'AminaKhan', 72, 'Naval Flashlight', 4, 'Checked Out'),
(76, '2024-01-02 12:44:24', 47, 'DanielSmith', 76, 'Folding Knife', 2, 'Checked Out'),
(77, '2024-01-02 12:44:29', 47, 'DanielSmith', 76, 'Folding Knife', 2, 'Checked In');



