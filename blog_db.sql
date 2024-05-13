-- Crear base de datos si no existe;
DROP DATABASE IF EXISTS blog_db;

CREATE DATABASE blog_db;
-- Se usa la tabla creada
USE blog_db;
-- Usuarios
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    userpassword VARCHAR(255) NOT NULL,
    userimg VARCHAR(255) NOT NULL
);

INSERT INTO users(username, lastname, email, userpassword, userimg) VALUES
('Matias', 'Arevalo', 'matt@matt.com', '$2a$10$ENDkIzGyPtMQduSw.GCxxO7armlaPwcekPMGM7TCsP8hPJdAGm5..', '1712006084350_user.jpeg');

-- Categorias
CREATE TABLE IF NOT EXISTS category (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL
);

INSERT INTO category(nombre) VALUES ("Programación");
-- Crear las diferentes tablas
-- DRAFT: 0 ES BORRADOR 1 PUBLICADO
CREATE TABLE IF NOT EXISTS article (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    estract VARCHAR(300),
    author_id INT,
    draft INT,
    img VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

INSERT INTO article(title, subtitle, content, estract, author_id, draft, img ) VALUES
('You’re Wasting Your Time Posting Daily on LinkedIn', 'Blind consistency vs intentional branding on LinkedIn','Holaarticle', 'Blind consistency vs intentional branding on LinkedIn', 1, 0,'1712006084350_user.jpeg' );


-- Comentarios
CREATE TABLE IF NOT EXISTS comentarios (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    article_id INT,
    user_id INT,
    content TEXT,
    create_at TIMESTAMP DEFAULT (NOW()),
    FOREIGN KEY (article_id) REFERENCES article(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Articulo y categorias - MUCHOS A MUCHOS
DROP TABLE IF EXISTS articulotags;

CREATE TABLE IF NOT EXISTS articulotags (
  tags_id INT NOT NULL,
  article_id INT NOT NULL,
  FOREIGN KEY(tags_id) REFERENCES category(id),
  FOREIGN KEY(article_id) REFERENCES article(id),
  PRIMARY KEY(tags_id, article_id)
);

INSERT INTO articulotags (tags_id, article_id) VALUES (1,1);
