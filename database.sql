CREATE TABLE users (
  id serial primary key not null,
  googleId varchar (200) not null,
  googleToken varchar (500) not null,
  googleEmail varchar (50) not null,
  googleName varchar (80) not null
);




CREATE TABLE "intern_sample" (
"id" serial not null,
"first_name" varchar(80) not null,
"last_name" varchar(80) not null,
"email" varchar(80) not null,
"phone" varchar(80) not null,
"companyID" varchar(120) not null,
"supervisorID" varchar(120) not null,
"step_up_groupID" varchar(120) not null,
);
