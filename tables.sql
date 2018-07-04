CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    users_id integer,
    name VARCHAR(255)    
);

CREATE TABLE IF NOT EXISTS objects (
    id SERIAL PRIMARY KEY,
    projects_id integer,
    details json
);