CREATE TABLE users (
  id serial primary key not null,
  googleId varchar (1200) not null,
  googleToken varchar (1200) not null,
  googleEmail varchar (50) not null,
  googleName varchar (80) not null
);

CREATE TABLE response_num (
    question_id INT REFERENCES questions(id) ON DELETE CASCADE, --not sure this data type - this is what connects the questions table to the response table
    intern_id VARCHAR(12) REFERENCES interns(primarykey) ON DELETE CASCADE, --not sure this data type - this is what connects the interns table to the response
    response_num INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE response_checkbox (
  intern_id VARCHAR(12) REFERENCES interns(primarykey) ON DELETE CASCADE, --not sure this data type - this is what connects the interns table to the response
  response_checkbox BOOLEAN,
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE response_comments (
  intern_id VARCHAR(12) REFERENCES interns(primarykey) ON DELETE CASCADE, --not sure this data type - this is what connects the interns table to the response
  response_comment VARCHAR(140),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    active BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE interns (
    primarykey VARCHAR(12) NOT NULL UNIQUE, --actually 9 characters long i.e., STU036824
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(40) UNIQUE,
    phone VARCHAR(20), --format of phone in Step-Up CSV file is '(206) 403-6147'
    company VARCHAR(100),
    supervisor VARCHAR(50), --this connects to company table (stretch goals)
    stepup_group_id INT REFERENCES stepup_group(id) ON DELETE CASCADE
 );

 --COPY CSV file into interns
 -- '/Users/yourUserName/Desktop/stepUpDatabaseTest.csv'
 COPY interns FROM '/Users/matthewlarson/Desktop/stepUpDatabaseTest.csv' DELIMITERS ',' CSV;

 CREATE TABLE stepup_group (
 	id SERIAL PRIMARY KEY,
 	group_name VARCHAR(20)
 );

CREATE TABLE questions (
    id SERIAL PRIMARY KEY NOT NULL, -- connects this to the responsesnum table
    q_text VARCHAR(1200), -- how to make this really long?
    active BOOLEAN,
    flagged BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COPY interns FROM '/Users/matthewlarson/Desktop/stepUpDatabaseTest.csv' DELIMITERS ',' CSV;

INSERT INTO stepup_group (group_name) VALUES ('Achieve');
INSERT INTO stepup_group (group_name) VALUES ('Discover');

INSERT INTO questions (q_text, active, flagged) VALUES ('To what extent do you feel properly trained for your internship?', true, false);
INSERT INTO questions (q_text, active, flagged) VALUES ('How challenging are your daily work tasks?', true, false);
INSERT INTO questions (q_text, active, flagged) VALUES ('How supportive is your supervisor?', true, false);
INSERT INTO questions (q_text, active, flagged) VALUES ('Do you like your internship?', true, false);
INSERT INTO questions (q_text, active, flagged) VALUES ('Do you feel welcome in your workplace?', true, true);
INSERT INTO questions (q_text, active, flagged) VALUES ('Do you want someone from STEP-UP to contact you this week?', true, true, 'response_checkbox');

-- Dummy Test for Twilio SMS
CREATE TABLE psi (
    id serial primary key not null,
    first_name VARCHAR(30),
    phone VARCHAR(20)
);

--OFFSET 0
INSERT INTO psi (first_name, phone) VALUES ('jim', 6127085347);
INSERT INTO psi (first_name, phone) VALUES ('zee', 6512468417);
INSERT INTO psi (first_name, phone) VALUES ('tessa', 6083702621);
INSERT INTO psi (first_name, phone) VALUES ('matt', 6122516818);
INSERT INTO psi (first_name, phone) VALUES ('millie', 6125164822);
--OFFSET 5
INSERT INTO psi (first_name, phone) VALUES ('amy', 8107016140);
INSERT INTO psi (first_name, phone) VALUES ('ben', 7633701331);
INSERT INTO psi (first_name, phone) VALUES ('ryan', 6122675655);
INSERT INTO psi (first_name, phone) VALUES ('barb', 9528365601);
INSERT INTO psi (first_name, phone) VALUES ('charlie', 6128128873);
--OFFSET 10
INSERT INTO psi (first_name, phone) VALUES ('sean', 6512715408);
INSERT INTO psi (first_name, phone) VALUES ('neota', 6124790137);
INSERT INTO psi (first_name, phone) VALUES ('abby', 7636479486);
INSERT INTO psi (first_name, phone) VALUES ('tiffany', 6122032823);
