import express from "express";
import axios from "axios";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", {
        source: "en",
        target: "it"
    });
});
app.post("/translate", async (req, res) => {
    try{
    const q = req.body.q;
    const source = req.body.source;
    const target = req.body.target;
    const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${q}&langpair=${source}|${target}
    `);
        const data = response.data.responseData.translatedText
        console.log(data);
        res.render("index.ejs", { 
                data,
                originalText: q,
                source: source,
                target: target
            }) 
}catch(error){
        res.sendStatus(404).json({
            error: `Language not available!`
        })
    }
   
});

app.listen(PORT, ()=> {console.log(`Server successfully running!`)})