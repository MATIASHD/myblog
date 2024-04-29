-- Crear base de datos si no existe;
CREATE DATABASE IF NOT EXISTS blog_db; 
-- Se usa la tabla creada
USE blog_db;
-- Crear las diferentes tablas
-- DRAFT: 0 ES BORRADOR 1 PUBLICADO
CREATE TABLE IF NOT EXISTS article (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    Author_id INT, 
    category_id INT,
    draft INT, 
    created_by TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
);
CREATE TABLE IF NOT EXISTS category (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS comentarios (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    article_id INT,
    user_id INT,
    content TEXT,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES article(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL,
    userimg VARCHAR(255) NOT NULL
);