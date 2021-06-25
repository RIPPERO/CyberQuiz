-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               5.7.31 - MySQL Community Server (GPL)
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych cyberquiz
CREATE DATABASE IF NOT EXISTS `cyberquiz` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cyberquiz`;

-- Zrzut struktury tabela cyberquiz.answer
CREATE TABLE IF NOT EXISTS `answer` (
  `answer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(50) NOT NULL DEFAULT '',
  `is_correct` enum('0','1') NOT NULL DEFAULT '0',
  `question_ID_ID` int(11) NOT NULL DEFAULT '0',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`answer_ID`,`question_ID_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK__question` (`question_ID_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer: 40 rows
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(1, 'A. The site is encrypted', '1', 1, 1),
	(2, 'B. The site is not available', '0', 1, 1),
	(3, 'C. The site is updated to the newest version', '0', 1, 1),
	(4, 'A. Use muli-faction authentication', '1', 2, 1),
	(5, 'B. Share your passwords with friends', '0', 2, 1),
	(6, 'C. Update your software frequently', '1', 2, 1),
	(7, 'D. Use Wi-Fi networks protected with password', '1', 2, 1),
	(8, 'False', '0', 3, 1),
	(9, 'True', '1', 3, 1),
	(10, '8 characters', '0', 4, 2),
	(11, '10 characters', '0', 4, 2),
	(12, '15 characters', '1', 4, 2),
	(13, 'Yes', '0', 5, 2),
	(14, 'No', '0', 5, 2),
	(15, 'Yes, even a few', '1', 5, 2),
	(16, 'Yes', '0', 6, 2),
	(17, 'No', '1', 6, 2),
	(18, 'Anniversary', '0', 7, 2),
	(19, 'Birthday', '0', 7, 2),
	(20, 'Pet name', '0', 7, 2),
	(21, 'None of the above', '1', 7, 2),
	(22, 'Site is encrypted', '0', 8, 2),
	(23, 'Page contains info that you have won e.g. a phone', '1', 8, 2),
	(24, 'You are on your banks\' site', '0', 8, 2),
	(25, 'No', '1', 9, 2),
	(26, 'Yes', '0', 9, 2),
	(27, 'Teasing others without a reason', '1', 10, 2),
	(28, 'Being polite to others', '0', 10, 2),
	(29, 'Helping other users', '0', 10, 2),
	(30, 'Fake SMS or e-mail to access your personal info', '1', 11, 3),
	(31, 'E-mails from your bank', '0', 11, 3),
	(32, 'SMS with your friends', '0', 11, 3),
	(33, 'Website requires an e-mail to create an account', '0', 12, 3),
	(34, 'Click fake links on fake mails from the banks', '1', 12, 3),
	(35, 'Enter your phone number to win e.g. new phone', '1', 12, 3),
	(36, 'No', '1', 13, 3),
	(37, 'Yes', '0', 13, 3),
	(38, 'You are so nice', '0', 14, 3),
	(39, 'It is nice to have you as a friend', '0', 14, 3),
	(40, 'Insulting people because of their religion', '1', 14, 3);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.answer_user
CREATE TABLE IF NOT EXISTS `answer_user` (
  `answer_user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID_ID` int(11) NOT NULL,
  `quiz_ID_ID` int(11) NOT NULL,
  `question_ID_ID` int(11) NOT NULL,
  `answer_ID_ID` int(11) NOT NULL,
  `quiz_user_ID_ID` int(11) NOT NULL,
  PRIMARY KEY (`answer_user_ID`),
  KEY `FK__user` (`user_ID_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`),
  KEY `FK__question` (`question_ID_ID`),
  KEY `FK__answer` (`answer_ID_ID`),
  KEY `FK_answer_user_quiz_user` (`quiz_user_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer_user: 26 rows
/*!40000 ALTER TABLE `answer_user` DISABLE KEYS */;
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(1, 1, 1, 1, 1, 1),
	(2, 1, 1, 2, 6, 1),
	(3, 1, 1, 3, 8, 1),
	(4, 1, 2, 4, 12, 2),
	(5, 1, 2, 5, 15, 2),
	(6, 1, 2, 6, 17, 2),
	(7, 1, 2, 7, 21, 2),
	(8, 1, 2, 8, 23, 2),
	(9, 1, 2, 9, 25, 2),
	(10, 1, 2, 10, 27, 2),
	(11, 1, 3, 11, 30, 3),
	(12, 1, 3, 12, 35, 3),
	(13, 1, 3, 13, 36, 3),
	(14, 1, 3, 14, 40, 3),
	(15, 1, 1, 1, 2, 4),
	(16, 1, 1, 2, 5, 4),
	(17, 1, 1, 3, 9, 4),
	(18, 2, 1, 1, 1, 5),
	(19, 2, 1, 2, 4, 5),
	(20, 2, 1, 3, 9, 5),
	(21, 2, 1, 1, 1, 6),
	(22, 2, 1, 2, 4, 6),
	(23, 2, 1, 3, 8, 6),
	(24, 2, 1, 1, 1, 7),
	(25, 2, 1, 2, 4, 7),
	(26, 2, 1, 3, 9, 7);
/*!40000 ALTER TABLE `answer_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.question
CREATE TABLE IF NOT EXISTS `question` (
  `question_ID` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(80) NOT NULL DEFAULT '',
  `type` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1 - jednokrotnego, 2 - wielokrotnego',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK_question_quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.question: 14 rows
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(1, 'What does the HTTPS at the beginning of a URL mean?', '1', 1),
	(2, 'What can you do to prevent unauthorized access to your accounts/files?', '2', 1),
	(3, 'Does backing up files help us to protect our data?', '1', 1),
	(4, 'How many characters of a password is the most secure?', '1', 2),
	(5, 'Should a password contain special characters?', '1', 2),
	(6, 'Is it safe to use the same password on several websites?', '1', 2),
	(7, 'What the password should be associated with?', '1', 2),
	(8, 'Which could be a sign of a dangerous site?', '1', 2),
	(9, 'Is it safe to process payments through unencrypted websites?', '1', 2),
	(10, 'Which of the following is an example of a hater?', '1', 2),
	(11, 'What is a phishing attack?', '1', 3),
	(12, 'Which of the following is an example of a phishing attack?', '2', 3),
	(13, 'Is it safe to send paid SMS to gain access to content on unsecured sites?', '1', 3),
	(14, 'Which of the following is an example of hate speech?', '1', 3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.quiz
CREATE TABLE IF NOT EXISTS `quiz` (
  `quiz_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `max_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_ID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz: 3 rows
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`quiz_ID`, `name`, `max_points`) VALUES
	(1, 'Beginner Quiz', 3),
	(2, 'Intermediate Quiz', 7),
	(3, 'Advanced Quiz', 4);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.quiz_user
CREATE TABLE IF NOT EXISTS `quiz_user` (
  `quiz_user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `final_score` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  `user_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_user_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`),
  KEY `FK__user` (`user_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz_user: 7 rows
/*!40000 ALTER TABLE `quiz_user` DISABLE KEYS */;
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(1, 2, '2021-06-25 11:02:00', 1, 1),
	(2, 7, '2021-06-25 11:02:26', 2, 1),
	(3, 4, '2021-06-25 11:02:56', 3, 1),
	(4, 1, '2021-06-24 11:03:23', 1, 1),
	(5, 3, '2021-06-23 11:04:59', 1, 2),
	(6, 2, '2021-06-24 11:05:17', 1, 2),
	(7, 3, '2021-06-25 11:05:20', 1, 2);
/*!40000 ALTER TABLE `quiz_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.user: 2 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(1, 'ADRIAN'),
	(2, 'ADAM');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
