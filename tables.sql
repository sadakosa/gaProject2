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
    creator_id integer,
    name VARCHAR(255),
    details json
);

CREATE TABLE IF NOT EXISTS users_projects (
    id SERIAL PRIMARY KEY,
    users_id  integer,
    projects_id integer
);

INSERT INTO projects (creator_id, name, details) VALUES (1, 'one', '{"drawings":[{"type":"circle","specs":[100,100,100,0,3],"draw":"stroke"},{"type":"rect","specs":[40,20,150,100],"draw":"stroke","stokeStyle":"red"},{"type":"text","specs":[10,50],"draw":"fill","font":"20px Arial"},{"type":"line","start":[0,0],"end":[200,100]}]}');