/* const express = require('express');
const path = require('path');
const app = express();
const port = 3006;

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal que sirve tu archivo HTML
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
})

intento de añadir un servidor basico al proyecto
*/