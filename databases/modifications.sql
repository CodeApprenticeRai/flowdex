-- I created a copy of sightings without the all_column primary key constriant
-- Instead I created an ID id as the constraint, making it a little easier to perform certain queries ( update ).
CREATE TABLE sightings_copy (
  ID integer primary key autoincrement,
  NAME VARCHAR(30) ,
  PERSON VARCHAR(30),
  LOCATION VARCHAR(30),
  SIGHTED DATE,
  CONSTRAINT fk1_sightings FOREIGN KEY (NAME) REFERENCES FLOWERS(COMNAME),
  CONSTRAINT fk2_sightings FOREIGN KEY (LOCATION) REFERENCES FEATURES(LOCATION)
);

INSERT INTO sightings_copy(name, person, location, sighted) SELECT name, person, location, sighted FROM SIGHTINGS;

DROP TABLE sightings;

ALTER TABLE sightings_copy RENAME TO sightings;
