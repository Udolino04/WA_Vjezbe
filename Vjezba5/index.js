import express from "express";
import { connectToDatabase } from "./db.js";

const app = express();
let db = await connectToDatabase();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pizza app");
});

app.get("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let allPizze = await pizze_collection.find().toArray();
  res.status(200).json(allPizze);
});

app.get('/pizze/:naziv', async (req, res) => {
    let pizze_collection = db.collection('pizze');
    let naziv_param = req.params.naziv;
    let pizza = await pizze_collection.findOne({ naziv: naziv_param });
    res.status(200).json(pizza);
    });

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Greška prilikom pokretanja servera", error);
  }
  console.log(`Pizza poslužitelj dela na http://localhost:${PORT}`);
});
