const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");



app.use(cors());
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



