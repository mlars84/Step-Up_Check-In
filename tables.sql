-- table set up SQL syntax for stepup checkin


-- Users Table :
-- Matt has already created, we use this to create users upon authentication

-- Interns Table: A table of all interns in the program. Primary key is how interns are matched to the existing system database at Step Up
CREATE TABLE interns (
    id SERIAL PRIMARY KEY NOT NULL,
    primarykey VARCHAR(12) UNIQUE, --not sure how long this is
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(20),
    phone INT,
    companyid VARCHAR(20), --this connects to company table (stretch goals)
    groupid VARCHAR(20), -- this connects to group table
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Group Table : Contains the two Step Up Groups at this time: Step Up Achieve and Step Up Discover
CREATE TABLE group (
    id SERIAL PRIMARY KEY NOT NULL, -- connects this table to interns table
    groupname VARCHAR(20) UNIQUE,
  );


-- Questions Table: Contains every question submitted by Step Up Staff
CREATE TABLE questions (
    id SERIAL PRIMARY KEY NOT NULL, -- connects this to the responsesnum table
    qtext VARCHAR(12), -- how to make this really long?
    active BOOLEAN,
    qtype VARCHAR(10), -- i don't think it should be varchar?
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Num Table : Contains the responses to the numeric questions in the student feedback form
CREATE TABLE responsenum (
    questionid, --not sure this data type - this is what connects the questions table to the response table
    internid, --not sure this data type - this is what connects the interns table to the response
    response INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Checkbox Table : Responses to "Would you like someone from Step Up to contact you this week?", all answers boolean true/false
CREATE TABLE responsecheckbox (
  internid, --not sure this data type - this is what connects the interns table to the response
  response BOOLEAN,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Comments Table : Responses to any additional intern comments on the form
CREATE TABLE responsecomments (
  internid, --not sure this data type - this is what connects the interns table to the response
  response VARCHAR(140),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Table: Step Up Staff are able to add admin which gives them permission to view specific pages
CREATE TABLE admin (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(50),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
