-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               5.7.31 - MySQL Community Server (GPL)
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.1.0.6116
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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer: 9 rows
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(1, 'A. The site is encrypted', '1', 1, 1),
	(2, 'B. The site is not available', '0', 1, 1),
	(3, 'C. The site is updated to the newset version', '0', 1, 1),
	(4, 'A. Use muli-faction authentication', '1', 2, 1),
	(5, 'B. Share your passwords with friends', '0', 2, 1),
	(6, 'C. Update your software frequently', '1', 2, 1),
	(7, 'D. Use Wi-Fi networks protected with password', '1', 2, 1),
	(8, 'A. False', '0', 3, 1),
	(9, 'B. True', '1', 3, 1);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.answer_user
CREATE TABLE IF NOT EXISTS `answer_user` (
  `answer_user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_ID_ID` int(11) NOT NULL,
  `quiz_ID_ID` int(11) NOT NULL,
  `question_ID_ID` int(11) NOT NULL,
  `answer_ID_ID` int(11) NOT NULL,
  PRIMARY KEY (`answer_user_ID`),
  KEY `FK__user` (`user_ID_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`),
  KEY `FK__question` (`question_ID_ID`),
  KEY `FK__answer` (`answer_ID_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer_user: 0 rows
/*!40000 ALTER TABLE `answer_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.question
CREATE TABLE IF NOT EXISTS `question` (
  `question_ID` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(80) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '1 - jednokrotnego, 2 - wielokrotnego, 3 - prawda/fałsz',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK_question_quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.question: 3 rows
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(1, 'What does the https at the beginning of a URL mean?', 1, 1),
	(2, 'What can you do to prevent unauthorised access to your accounts/files?', 2, 1),
	(3, 'Does backing up files help us to protect our data?', 3, 1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.quiz
CREATE TABLE IF NOT EXISTS `quiz` (
  `quiz_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `max_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_ID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz: 2 rows
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`quiz_ID`, `name`, `max_points`) VALUES
	(1, 'Begginer Quiz', 5),
	(2, 'Uppermidiate Quiz', 10);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.quiz_user
CREATE TABLE IF NOT EXISTS `quiz_user` (
  `quiz_user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `final_score` int(11) NOT NULL,
  `date` date NOT NULL,
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  `user_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_user_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`),
  KEY `FK__user` (`user_ID_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz_user: 0 rows
/*!40000 ALTER TABLE `quiz_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_user` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.user: 3 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(1, 'adrian'),
	(2, 'adam'),
	(3, 'jarek'),
	(4, 'test');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
