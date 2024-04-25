const express = require ('express');
const bodyParser = require ('body-parser');
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

const { v4: uuidv4 } = require('uuid');
const observacoesPorLembreteId = {};

app.get('/lembretes', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.put('/lembretes/:id/observacoes', async (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
    observacoesDoLembrete.push({ id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete;

    await axios.post("http://localhost:10000/eventos", {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs, texto, lembreteId: req.params.id
        }
    })
    res.status(201).send(observacoesDoLembrete);
});

app.listen(5000, () => {
    console.log('Lembretes. Porta 5000');
});