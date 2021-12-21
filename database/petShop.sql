DELETE TABLE IF EXISTS pets;

CREATE TABLE pets (
  id serial PRIMARY KEY,
  name text,
  age integer,
  kind text
);

INSERT INTO pets (name, age, kind) VALUES ('fido', 7,'rainbow');
INSERT INTO pets (name, age, kind) VALUES ('buttons', 10,'snake');