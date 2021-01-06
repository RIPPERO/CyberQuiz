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
  `is_correct` bit(1) NOT NULL DEFAULT b'0',
  `question_ID_ID` int(11) NOT NULL DEFAULT '0',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`answer_ID`,`question_ID_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK__question` (`question_ID_ID`),
  KEY `FK__quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.answer: 2 rows
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` (`answer_ID`, `answer`, `is_correct`, `question_ID_ID`, `quiz_ID_ID`) VALUES
	(1, 'tak', b'1', 1, 1),
	(2, 'nie', b'0', 1, 1);
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
  `question` varchar(50) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL DEFAULT '0',
  `quiz_ID_ID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_ID`,`quiz_ID_ID`) USING BTREE,
  KEY `FK_question_quiz` (`quiz_ID_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.question: 1 rows
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` (`question_ID`, `question`, `type`, `quiz_ID_ID`) VALUES
	(1, 'czy ptak ma kota?', 1, 1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;

-- Zrzut struktury tabela cyberquiz.quiz
CREATE TABLE IF NOT EXISTS `quiz` (
  `quiz_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `max_points` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`quiz_ID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.quiz: 1 rows
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`quiz_ID`, `name`, `max_points`) VALUES
	(1, 'pierwszy quiz', 20);
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
  `username` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Zrzucanie danych dla tabeli cyberquiz.user: 3 rows
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_ID`, `username`) VALUES
	(1, 'adrian'),
	(2, 'adam'),
	(3, 'jarek');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
