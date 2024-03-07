const server = require('./src/index');
const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => {
    console.log("El server esta corriendo en el puerto " + PORT);
});