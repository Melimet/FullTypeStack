Connecting to fdaa:0:9865:a7b:c07e:48af:7cee:2... complete
psql (14.4 (Debian 14.4-1.pgdg110+1))
Type "help" for help.

postgres=# CREATE TABLE blogs (
postgres(# id SERIAL PRIMARY KEY,
postgres(# author text,
postgres(# url text NOT NULL,
postgres(# title text NOT NULL,
postgres(# likes integer DEFAULT 0
postgres(# );
CREATE TABLE

postgres=# insert into blogs (author, url, title) values ('raimo', 'www.facebook.com', 'mietteitä raksalla');
postgres=# insert into blogs (author, url, title) values ('pena', 'www.facebook.com', 'elämän aforismit');

postgres=# select * from blogs                                                                ;
 id | author |       url        |       title        | likes 
----+--------+------------------+--------------------+-------
  1 | pena   | www.facebook.com | elämän aforismit   |     0
  2 | raimo  | www.facebook.com | mietteitä raksalla |     0
(2 rows)
