const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.options('*', cors(corsOptions));

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBkzd76HqIBXyiblabZBqEkGLA1FR6XpaE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});






app.post("/", async (req, res, next) =>{
        res.header(
            "Access-Control-Allow-Origin",
            "React app URL"
        );
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
        const prompt = req.body.message;
        const result = await model.generateContent(prompt);
        res.json({data: result.response.text()});
});

app.listen(8080, () =>{
    console.log("iniciado");
})



