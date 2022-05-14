# time-logger
A simple app to log actions with date, start time, end time and description using react front end and nodejs backend with a postgresql database with table name public.time_logs.

Database table:
CREATE TABLE public.time_logs (
	log_id uuid NOT NULL DEFAULT md5(random()::text || clock_timestamp()::text)::uuid,
	log_date varchar NULL,
	start_time varchar NULL,
	end_time varchar NULL,
	description varchar NULL,
	entered_on timestamptz NULL,
	CONSTRAINT time_logs_pk PRIMARY KEY (log_id)
	
);

The app's db_config(db_config.js file in server folder) is tied to a .env file with following environment vairables for the database
 
  user => process.env.user
  
  database => process.env.database
  
  password => process.env.password
  
  port => process.env.port
  
  host => process.env.host
   
  
Download the files in repo, cd to client folder and run 'npm install' to install all dependencies. CD to the server folder(inside the client folder)  and run 'npm install' to install all dependencies for the server

Ensure all environment variables have been set, and database created with table public.time_logs.
Then cd to client folder and run "npm start"
  
  


