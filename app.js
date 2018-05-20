const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.send(200).json({
        message: 'Está funcionando Perfeitamente bem!'
    });
});

module.exports = app;