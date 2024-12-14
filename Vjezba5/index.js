import express from "express";
import { connectToDatabase } from "./db.js";

const app = express();
let db = await connectToDatabase();

db.collection("pizze").createIndex({ naziv: 1 }, { unique: true });

app.get("/", (req, res) => {
  res.send("Pizza app");
});

app.get("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let allPizze = await pizze_collection.find().toArray();
  res.status(200).json(allPizze);
});

app.get("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  let pizza = await pizze_collection.findOne({ naziv: naziv_param });
  res.status(200).json(pizza);
});

// ne dela kako rabi
app.post("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let novaPizza = req.body;
  try {
    let result = await pizze_collection.insertOne(novaPizza);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.post("/narudzbe", async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let novaNarudzba = req.body;
  try {
    let result = await narudzbe_collection.insertOne(novaNarudzba);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Greška prilikom pokretanja servera", error);
  }
  console.log(`Pizza poslužitelj dela na http://localhost:${PORT}`);
});
