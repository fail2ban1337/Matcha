/* Replace with your SQL commands */

CREATE TABLE user_info
(
    id int PRIMARY Key AUTO_INCREMENT,
    user_gender ENUM
('Male', 'Female') DEFAULT 'Male',
user_gender_interest ENUM
('Male', 'Female', 'Bisexual') DEFAULT 'Bisexual',
    user_relationship ENUM
('Single', 'In a relationship', 'Engaged', 'Married' ) DEFAULT 'Single',
user_tags varchar
(255),
    user_birth date,
    user_interests varchar
(255),
user_country VARCHAR
(10) NOT NULL DEFAULT 'MOROCCO',
user_city VARCHAR
(15),
user_lat VARCHAR DEFAULT '32.879101'
(15),
user_lng VARCHAR DEFAULT '-6.91118'
(15),
 user_current_occupancy ENUM
('Student', 'Employer', 'None') DEFAULT 'None',
user_location INT (11),
user_biography VARCHAR
(255),
info_verified boolean DEFAULT FALSE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


-- current occupancy