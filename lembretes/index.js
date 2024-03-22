const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const lembretes = {};
contador = 0;

app.put('/lembretes', (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes(contador) = (
        contador, texto
    )
    res.status(201).send(lembretes[contador]);
});

app.get ('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.put ('/lembretes', (req, res) => {
});

app.listen(4000, () => {
    console.log('lembretes. Porta 4000');
});