-- 1) أنشئ القاعدة (نفّذ هذا السطر وأنت متصل بقاعدة postgres):
-- CREATE DATABASE users_api_db;
-- 2) انتقل إليها:  \c users_api_db
-- 3) ثم نفّذ ما يلي:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, age) VALUES
    ('Hamza', 'hamza@example.com', 22),
    ('Sara', 'sara@example.com', 25),
    ('Omar', 'omar@example.com', 30);
