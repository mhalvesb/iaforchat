const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


const corsOptions = {
    origin: 'http://localhost:5173', // Permitir esta origem
    methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
    optionsSuccessStatus: 200 // Responder com status 200 para OPTIONS
  };

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBkzd76HqIBXyiblabZBqEkGLA1FR6XpaE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});






app.post("/", async (req, res) =>{
        const prompt = req.body.message;
        const result = await model.generateContent(prompt);
        res.json({data: result.response.text()});
});

app.listen(8080, () =>{
    console.log("iniciado");
})



