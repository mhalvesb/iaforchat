const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");



app.use(cors({
    origin: 'https://chatbot-nine-self.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBkzd76HqIBXyiblabZBqEkGLA1FR6XpaE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://chatbot-nine-self.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
});


app.get("/", (req, res) =>{
    res.send("ok");
});

app.post("/", async (req, res, next) =>{
        const prompt = req.body.message;
        const result = await model.generateContent(prompt);
        res.json({data: result.response.text()});
});

app.listen(8080, () =>{
    console.log("iniciado");
})



