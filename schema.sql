create table movies(
id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title varchar(100),
release_date varchar(100),
poster_path varchar(100),
overview varchar(100),
comment varchar(100) null
);
