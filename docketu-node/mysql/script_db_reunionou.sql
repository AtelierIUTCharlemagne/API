-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : iut_db_atelier:3306
-- Généré le : mer. 30 mars 2022 à 14:17
-- Version du serveur : 10.6.5-MariaDB-1:10.6.5+maria~focal
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_reunionou`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`, `create_time`) VALUES
(1, 'testeurfou', 'teste@gmail.com', '$2a$10$xu5gLArD6ZwD6j.TGzGWD.fmxUiWwnNEspPaulds3GeKpOJ4VGGuK', '2022-03-30 12:16:09'),
(2, 'testeurfou', 'teste@gmail.com', '$2a$10$Wb.QKhdgo00qLf0b00tPFO48trMaYzXY7w.n/L.9s3aXFvGgCvEnu', '2022-03-30 14:14:01');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `events_id_events` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id_comment`, `created_at`, `events_id_events`, `text`, `user_id_user`) VALUES
(1, '2022-03-23 08:38:35', 1, 'On ramene a boire ?', 1),
(2, '2022-03-23 10:29:03', 1, 'On amene a boire ?', 1),
(4, '2022-03-23 10:30:06', 3, 'Tema la taille', 2),
(5, '2022-03-23 10:32:12', 3, 'Tema la taille', 2),
(6, '2022-03-23 10:32:58', 3, 'Tema la taille', 2),
(7, '2022-03-23 10:33:58', 3, 'Tema la taille', 2),
(8, '2022-03-23 10:43:43', 3, 'Tema la taille', 2),
(9, '2022-03-23 10:44:44', 3, 'Tema la taille', 2),
(10, '2022-03-23 10:53:41', 3, 'Tema la taille', 2),
(11, '2022-03-23 10:53:58', 3, 'Tema la taille', 2),
(12, '2022-03-23 10:56:14', 2, 'Tema la taille', 1),
(13, '2022-03-23 10:58:03', 2, 'Tema la taille', 1),
(14, '2022-03-23 10:58:08', 2, 'Tema la taille', 1),
(15, '2022-03-23 13:20:28', 2, 'Tema la taille', 1),
(16, '2022-03-23 13:44:12', 2, 'Tea', 1),
(17, '2022-03-23 13:44:47', 2, 'Tea', 2),
(18, '2022-03-23 13:44:51', 2, 'Tea', 3),
(19, '2022-03-23 13:46:45', 2, 'Tea', 3),
(20, '2022-03-23 14:04:53', 2, 'Tea', 2),
(21, '2022-03-23 14:05:05', 2, 'Tea', 1);

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id_events` int(11) NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `createur` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `localisation` varchar(128) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `date_events` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  `user_id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id_events`, `title`, `createur`, `address`, `localisation`, `token`, `date_events`, `last_update`, `user_id_user`) VALUES
(1, 'rdv_jean anniversaire_Papy', '', '452-4263 Est, Rd.', '32.5969645568, -111.7979297792', 'UIE14MEN6WH', '2021-11-12 00:00:00', '2021-10-07 00:00:00', 1),
(2, 'anniversaire_mami anniversaire_Laure', '', '261-866 Nisl Rd.', '-67.7927790592, -82.838011904', 'FWG76WMO2EK', '2022-11-27 00:00:00', '2022-02-13 00:00:00', 2),
(3, 'rdv_jean anniversaire_Papy', '', 'Ap #788-4284 Gravida St.', '42.9407051776, 147.9463177216', 'WUW82PHK5SW', '2021-10-07 00:00:00', '2021-07-21 00:00:00', 1),
(4, 'anniversaire_mami anniversaire_Laure', '', '614-8982 Massa Av.', '83.1886403584, -7.3505230848', 'LJS66OMP5MM', '2022-11-13 00:00:00', '2021-06-25 00:00:00', 3),
(5, 'rdv_arthure rdv_jean', '', '707-8926 Eu, Street', '69.261202944, -77.6789656576', 'XXO18TJE1QP', '2022-10-01 00:00:00', '2022-04-14 00:00:00', 2),
(6, 'un titre', '', 'à l iut', '48.2 6.2', '55be7978-50f1-46a4-892e-76a6ee09fd43', '2022-12-12 00:00:00', '2022-03-22 11:04:37', 1),
(7, 'un titre', '', 'à l iut', '48.2 6.2', 'e30cd9aa-12fc-4cf5-baae-cd152b381d0f', '2022-12-12 00:00:00', '2022-03-22 11:05:35', 1),
(8, 'un titre', '', 'à l iut', '48.2 6.2', '288f0589-4371-42fe-86ff-d6f3b9034fb9', '2022-12-12 00:00:00', '2022-03-22 11:07:37', 1),
(9, 'un titre', '', 'à l iut', '48.2 6.2', '73a2acf8-39ff-4124-ac47-7a6b818e8fa6', '2022-12-12 00:00:00', '2022-03-22 11:12:56', 1),
(10, 'un titre', '', 'à l iut', '48.2 6.2', '18bc0c5b-7499-4a9a-a8b0-ab0503e61bed', '2022-12-12 00:00:00', '2022-03-22 11:13:22', 1),
(13, 'un titre', '', 'à l iut', '48.2 6.2', 'd8402685-578e-4d5f-8826-154edc4f6a5e', '2022-12-12 00:00:00', '2022-03-22 13:16:45', 1),
(14, 'un titre', '', 'à l iut', '48.2 6.2', '6e5601d8-666b-4e57-a2d1-4c910567d2c8', '2022-12-12 00:00:00', '2022-03-22 13:24:35', 1),
(16, 'un titre', '', 'à l iut', '48.2 6.2', 'ec24fa89-accb-4f14-bcf8-0ddc8b9ed940', '2022-12-12 00:00:00', '2022-03-22 13:25:58', 1),
(17, 'un titre', '', 'à l iut', '48.2 6.2', '8371ec7e-955d-4a51-abca-e9cefe2bb65f', '2022-12-12 00:00:00', '2022-03-22 13:36:30', 1),
(18, 'un titre', '', 'à l iut', '48.2 6.2', 'a218331d-907a-4491-9ccf-533a5dfb1e43', '2022-12-12 00:00:00', '2022-03-22 13:36:49', 1),
(19, 'un titre', '', 'à l iut', '48.2 6.2', 'c2205a1e-b2da-45dd-9919-04afb94ccce5', '2022-12-12 00:00:00', '2022-03-22 13:38:23', 1),
(20, 'un titre', '', 'à l iut', '48.2 6.2', '8f61be1f-22ca-46fb-b2bd-46c674a24d3c', '2022-12-12 00:00:00', '2022-03-22 13:40:46', 1),
(21, 'un titre', '', 'à l iut', '48.2 6.2', 'fafd4308-afde-48ef-8081-82883c6ddd2b', '2022-12-12 00:00:00', '2022-03-22 13:41:14', 1),
(23, 'un titre', '', 'à l iut', '48.2 6.2', 'd8a83bbd-ed11-485f-adb1-f28e7ab8c94b', '2022-12-12 00:00:00', '2022-03-22 13:41:57', 1),
(24, 'un titre', '', 'à l iut', '48.2 6.2', 'a0c327d7-c9ee-4594-9ad4-48c68c8ebc88', '2022-12-12 00:00:00', '2022-03-22 13:43:06', 1),
(25, 'un titre', '', 'à l iut', '48.2 6.2', 'c80d07e7-6ecc-45e9-b7f4-b22d3c47e397', '2022-12-12 00:00:00', '2022-03-22 13:46:20', 1),
(26, 'un titre', '', 'à l iut', '48.2 6.2', '9cf3027f-a91e-4084-8d72-33d57f419225', '2022-12-12 00:00:00', '2022-03-22 13:46:52', 1),
(27, 'un titre', '', 'à l iut', '48.2 6.2', '64622c84-c1e5-4f1d-b2d7-2f2c3bb70fca', '2022-12-12 00:00:00', '2022-03-22 13:47:53', 1),
(28, 'un titre', '', 'à l iut', '48.2 6.2', 'a96d441b-44e3-4845-a974-8298c341fa82', '2022-12-12 00:00:00', '2022-03-22 13:48:18', 1),
(29, 'un titre', '', 'à l iut', '48.2 6.2', '3ef07f50-4813-490a-9b46-9db5b943c172', '2022-12-12 00:00:00', '2022-03-22 13:49:10', 1),
(30, 'un titre', '', 'à l iut', '48.2 6.2', '78161d33-27ce-4c7c-8643-4988a4b5b310', '2022-12-12 00:00:00', '2022-03-22 13:50:42', 1),
(31, 'un titre', '', 'à l iut', '48.2 6.2', 'b4d34f28-dfab-4118-857a-3939e8a6bf1f', '2022-12-12 00:00:00', '2022-03-23 08:06:34', 1),
(32, 'un titre', '', 'à l iut', '48.2 6.2', 'a8300bcd-ce84-4a64-9e0f-e033aaddae46', '2022-12-12 00:00:00', '2022-03-23 10:19:19', 1),
(33, 'un titre', '', 'à l iut', '48.2 6.2', '89a8f9ae-b8f9-43f6-84b6-9305449e3207', '2022-12-12 00:00:00', '2022-03-23 13:14:36', 1),
(34, 'un titre', '', 'à l iut', '48.2 6.2', '1558a119-e588-4fab-9bd9-e3737e24df3c', '2022-12-12 00:00:00', '2022-03-23 13:17:35', 1),
(35, 'un titre', '', 'à l iut', '48.2 6.2', 'c7fc7c3d-e4ed-4cda-a8de-758ec4738d74', '2022-12-12 00:00:00', '2022-03-23 13:17:35', 1),
(36, 'Relancer Docker', '', 'IUT Nancy-Charlemagne', '6.160873, 48.682843', '134e40fd-c6dd-4363-991b-4f63708503cf', '1960-01-01 00:00:00', '2022-03-29 13:57:02', 6),
(42, 'un titre', '', 'à l iut', '48.2, 6.2', '1c504c15-b8dd-4fda-a3d2-6e9772127c19', '2022-12-12 00:00:00', '2022-03-29 14:14:13', 12),
(43, 'Relancer docker', '', 'IUT Nancy-Charlemagne', '48.682843, 6.160873', '949bd575-fe78-4ada-9ec3-680f80e67eb0', '1960-01-01 00:00:00', '2022-03-29 14:18:53', 12),
(44, 'un titre', 'David Galloway', 'à l iut', '48.2 6.2', '995e9a75-a51f-4c23-9be2-8a4726141a85', '2022-12-12 00:00:00', '2022-03-30 08:49:16', 1),
(45, 'un titre', 'David Galloway', 'à l iut', '48.2 6.2', 'aba1178e-ec60-43b1-97cd-f8e9c9e9b055', '2022-12-12 00:00:00', '2022-03-30 08:57:02', 1),
(46, 'fcghbjnk,l;mlkjghbn', 'testeurfou', 'Paris', '2.35183, 48.85658', '23c028c0-28b2-4996-9119-23c3adaadbb7', '1960-01-01 00:00:00', '2022-03-30 13:48:38', 6),
(47, 'fzyzdgvh', 'testeurfou', 'Paris', '48.85658, 2.35183', 'bd806199-5ab4-4000-a5ec-f812f18df601', '1960-01-01 00:00:00', '2022-03-30 13:50:40', 6),
(48, 'hdzdhadz', 'testeurfou', 'Nancy', '48.69278, 6.18361', '31ca444c-e84f-49d7-8745-880275c8d270', '1960-01-01 00:00:00', '2022-03-30 13:57:09', 6),
(49, 'un titre', 'David Galloway', 'à l iut', '48.2 6.2', '17a2be5b-02f5-4866-a69f-4948ae85508b', '2022-12-12 00:00:00', '2022-03-30 14:14:27', 1);

-- --------------------------------------------------------

--
-- Structure de la table `events_annex`
--

CREATE TABLE `events_annex` (
  `id_events_annex` int(11) NOT NULL,
  `answered_at` datetime NOT NULL DEFAULT current_timestamp(),
  `pseudo` varchar(32) DEFAULT NULL,
  `present` varchar(1) DEFAULT NULL,
  `user_id_user` int(11) DEFAULT NULL,
  `events_id_events` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `events_annex`
--

INSERT INTO `events_annex` (`id_events_annex`, `answered_at`, `pseudo`, `present`, `user_id_user`, `events_id_events`) VALUES
(2, '2022-03-23 08:57:38', 'David', '\0', 1, 2),
(3, '2022-03-23 09:38:33', 'un pseudo', '1', NULL, 1),
(7, '2022-03-23 09:54:21', 'David Galloway', '0', 1, 1),
(10, '2022-03-23 13:24:33', 'test', '1', NULL, 1),
(11, '2022-03-23 13:24:51', 'Drew Fields', '0', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` longtext DEFAULT NULL,
  `create_time` datetime DEFAULT current_timestamp(),
  `last_connection` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `username`, `email`, `password`, `create_time`, `last_connection`) VALUES
(1, 'David Galloway', 'magna.et@icloud.couk', 'CRC42NKU8GZ', '2021-08-11 00:00:00', '2021-08-11 00:00:00'),
(2, 'Karina Atkins', 'vitae@outlook.edu', 'HMQ69SWS1RE', '2021-10-02 00:00:00', '2021-10-02 00:00:00'),
(3, 'Drew Fields', 'penatibus.et@hotmail.couk', 'QZX92FQE4AX', '2021-12-28 00:00:00', '2021-12-28 00:00:00'),
(4, 'Jared Gonzales', 'dui.fusce.diam@yahoo.net', 'DTM76XOI4DB', '2021-06-11 00:00:00', '2021-06-11 00:00:00'),
(5, 'Denton Bernard', 'eget@yahoo.ca', 'BQO92LRN8SM', '2021-06-11 00:00:00', '2021-06-11 00:00:00'),
(6, 'testeurfou', 'testeurfou@gmail.com', '$2a$10$UujwXOWEYENk/M7.DF83r.e9YZ0iwhzopo.xVR9Glsdeh9r5AzSG6', '2022-03-21 16:43:18', NULL),
(8, 'testeurfou', 'testeurfdqdzadaazdazdou@gmail.com', '$2a$10$r.nOTMnOU6gDnzHUT8vdYukJlfwVFWgOK0mAhiInKuO4dYiWi606G', '2022-03-23 11:20:58', NULL),
(11, 'testeurfou', 'teste@gmail.com', '$2a$10$2awi/15sovgDPQzvCbteIOP1yx9puWz69PtVEJuvcipTA8C.fy76O', '2022-03-23 13:14:01', NULL),
(12, 'test123', 'test123@gmail.com', '$2a$10$lL72NWWPP0rWMKwsmfb55uwjNHhzznnX0iKiyHX38mDnefv4mNScm', '2022-03-29 14:03:27', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`,`user_id_user`),
  ADD KEY `fk_comment_events1_idx` (`events_id_events`),
  ADD KEY `fk_comment_user1_idx` (`user_id_user`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_events`),
  ADD KEY `user_id_user` (`user_id_user`);

--
-- Index pour la table `events_annex`
--
ALTER TABLE `events_annex`
  ADD PRIMARY KEY (`id_events_annex`),
  ADD KEY `fk_events_annex_user1_idx` (`user_id_user`),
  ADD KEY `fk_events_annex_events1_idx` (`events_id_events`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id_events` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `events_annex`
--
ALTER TABLE `events_annex`
  MODIFY `id_events_annex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_events1` FOREIGN KEY (`events_id_events`) REFERENCES `events` (`id_events`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comment_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_events_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `events_annex`
--
ALTER TABLE `events_annex`
  ADD CONSTRAINT `fk_events_annex_events1` FOREIGN KEY (`events_id_events`) REFERENCES `events` (`id_events`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_events_annex_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
