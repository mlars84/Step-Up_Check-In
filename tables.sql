-- table set up SQL syntax for stepup checkin

-- Interns Table: A table of all interns in the program. Primary key is how interns are matched to the existing system database at Step Up
CREATE TABLE interns (
    id SERIAL PRIMARY KEY NOT NULL,
    primarykey VARCHAR(12) UNIQUE, --actually 9 characters long i.e., STU036824
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(40) UNIQUE,
    phone VARCHAR(20), --format of phone in Step-Up CSV file is '(206) 403-6147'
    company VARCHAR(100),
    supervisor VARCHAR(50), --this connects to company table (stretch goals)
    stepupgroupid INT, -- this connects to group table
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table: Contains google oauth info for all users to authenticate into
-- the app with.
CREATE TABLE users (
  id serial primary key not null,
  googleid varchar (1200) not null,
  googletoken varchar (1200) not null,
  googleemail varchar (50) not null,
  googlename varchar (80) not null
);

-- Group Table : Contains the two Step Up Groups at this time: Step Up Achieve and Step Up Discover
CREATE TABLE stepupgroup (
    id SERIAL PRIMARY KEY NOT NULL, -- connects this table to interns table
    groupname VARCHAR(20)
);

-- Questions Table: Contains every question submitted by Step Up Staff
CREATE TABLE questions (
    id SERIAL PRIMARY KEY NOT NULL, -- connects this to the responsesnum table
    qtext VARCHAR(140), -- how to make this really long?
    active BOOLEAN,
    qtype VARCHAR(10), -- i don't think it should be varchar?
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Num Table : Contains the responses to the numeric questions in the student feedback form
CREATE TABLE responsenum (
    questionid INT, --not sure this data type - this is what connects the questions table to the response table
    internid INT, --not sure this data type - this is what connects the interns table to the response
    responsenum INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Checkbox Table : Responses to "Would you like someone from Step Up to contact you this week?", all answers boolean true/false
CREATE TABLE responsecheckbox (
  internid INT, --not sure this data type - this is what connects the interns table to the response
  responsecheckbox BOOLEAN,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Response Comments Table : Responses to any additional intern comments on the form
CREATE TABLE responsecomments (
  internid INT, --not sure this data type - this is what connects the interns table to the response
  responsecomment VARCHAR(140),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Table: Step Up Staff are able to add admin which gives them permission to view specific pages
CREATE TABLE admin (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    active BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


COPY TO interns [()]
