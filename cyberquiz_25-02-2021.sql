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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer: 12 rows
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(1, 'A. The site is encrypted', '1', 1, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(2, 'B. The site is not available', '0', 1, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(3, 'C. The site is updated to the newset version', '0', 1, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(4, 'A. Use muli-faction authentication', '1', 2, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(5, 'B. Share your passwords with friends', '0', 2, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(6, 'C. Update your software frequently', '1', 2, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(7, 'D. Use Wi-Fi networks protected with password', '1', 2, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(8, 'A. False', '0', 3, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(9, 'B. True', '1', 3, 1);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(10, 'A. True', '1', 4, 2);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(11, 'B. False', '0', 4, 2);
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(12, 'A. True', '1', 5, 3);
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
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer_user: 7 rows
/*!40000 ALTER TABLE `answer_user` DISABLE KEYS */;
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(1, 2, 1, 1, 1, 1);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(2, 2, 1, 2, 7, 1);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(3, 2, 1, 3, 9, 1);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(4, 1, 1, 1, 1, 2);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(5, 1, 1, 2, 4, 2);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(6, 1, 1, 3, 8, 2);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(7, 1, 3, 5, 12, 3);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(8, 1, 1, 1, 1, 4);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(9, 1, 1, 2, 4, 4);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(10, 1, 1, 3, 9, 4);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(11, 1, 1, 1, 3, 5);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(12, 1, 1, 2, 4, 5);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(13, 1, 1, 3, 9, 5);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(14, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(15, 1, 1, 2, 4, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(16, 1, 1, 2, 4, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(17, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(18, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(19, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(20, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(21, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(22, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(23, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(24, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(25, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(26, 1, 1, 1, 1, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(27, 1, 1, 2, 4, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(28, 1, 1, 3, 8, 6);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(48, 1, 1, 3, 9, 8);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(47, 1, 1, 2, 4, 8);
INSERT INTO `answer_user` (`answer_user_ID`, `user_ID_ID`, `quiz_ID_ID`, `question_ID_ID`, `answer_ID_ID`, `quiz_user_ID_ID`) VALUES
	(46, 1, 1, 1, 1, 8);
/*!40000 ALTER TABLE `answer_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.question
CREATE TABLE IF NOT EXISTS `question` (
  `question_ID` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(80) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '1 - jednokrotnego, 2 - wielokrotnego, 3 - prawda/fałsz',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK_question_quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.question: 5 rows
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(1, 'What does the https at the beginning of a URL mean?', 1, 1);
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(2, 'What can you do to prevent unauthorised access to your accounts/files?', 2, 1);
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(3, 'Does backing up files help us to protect our data?', 3, 1);
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(4, 'Test', 1, 2);
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(5, 'Test', 1, 3);
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
	(1, 'Begginer Quiz', 3);
INSERT INTO `quiz` (`quiz_ID`, `name`, `max_points`) VALUES
	(2, 'Uppermidiate Quiz', 6);
INSERT INTO `quiz` (`quiz_ID`, `name`, `max_points`) VALUES
	(3, 'Advanced Quiz', 10);
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz_user: 3 rows
/*!40000 ALTER TABLE `quiz_user` DISABLE KEYS */;
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(1, 3, '2021-02-19 12:26:54', 1, 2);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(2, 2, '2021-02-19 13:07:19', 1, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(3, 1, '2021-02-22 22:48:27', 3, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(4, 3, '2021-02-25 13:13:01', 1, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(5, 2, '2021-02-25 13:16:18', 1, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(6, 2, '2021-02-25 16:10:27', 1, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(7, 3, '2021-02-25 16:14:37', 1, 1);
INSERT INTO `quiz_user` (`quiz_user_ID`, `final_score`, `date`, `quiz_ID_ID`, `user_ID_ID`) VALUES
	(8, 3, '2021-02-25 16:29:15', 1, 1);
/*!40000 ALTER TABLE `quiz_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.user: 3 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(1, 'ADRIAN');
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(2, 'ADAM');
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(3, 'JAREK');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
