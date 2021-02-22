INSERT INTO users (first_name, last_name, email, password) VALUES ('Pete', 'Scale', 'test1@test.com', 'partayyyy1');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Michael', 'Rosa', 'test2@test.com', 'partayyyy2');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Manpreet', 'Lakhan', 'test3@test.com', 'partayyyy3');
INSERT INTO users (first_name, last_name, email, password) VALUES ('Aika', 'Kuo', 'test4@test.com', 'partayyyy4');

INSERT INTO partays (name, summary, date, time, host_user_id) VALUES ('Christmas Party','This is a Christmas party to celebrate Baby Jesus.','2021-12-22','21:30:00', 1 );
INSERT INTO partays (name, summary, date, time, host_user_id) VALUES ('Halloween Party','This is a Halloween party to celebrate Baby Jesus.','2021-10-31','21:30:00', 2);
INSERT INTO partays (name, summary, date, time, host_user_id) VALUES ('New Years Party','This is a New Years party to celebrate Baby Jesus.','2021-12-31','21:30:00', 3 );
INSERT INTO partays (name, summary, date, time, host_user_id) VALUES ('Birthday Party','This is a Birthday party to celebrate Baby Jesus.','2021-12-25','21:30:00', 4 );

INSERT INTO invites (partay_id, user_id) VALUES (1,1);
INSERT INTO invites (partay_id, user_id) VALUES (2,2);
INSERT INTO invites (partay_id, user_id) VALUES (3,3);
INSERT INTO invites (partay_id, user_id) VALUES (4,4);
INSERT INTO invites (partay_id, user_id) VALUES (4,1);
INSERT INTO invites (partay_id, user_id) VALUES (4,2);
INSERT INTO invites (partay_id, user_id) VALUES (4,3);