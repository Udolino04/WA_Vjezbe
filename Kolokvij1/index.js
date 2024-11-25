import express from "express";
import korisnici from "./routes/korisnici.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Pozdrav Mateo Udovicic")
})

app.get("/korisnici",korisnici)

app.post("/korisnici", korisnici)

app.get("/korisnici/:id", korisnici)

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});