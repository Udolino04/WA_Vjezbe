import express from "express";
import { connectToDatabase } from "./db.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
let db = await connectToDatabase();

db.collection("pizze").createIndex({ naziv: 1 }, { unique: true });

app.get("/", (req, res) => {
  res.send("Pizza app");
});

app.get("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let cijena_query = req.query.cijena;
  if (!cijena_query) {
    let pizze = await pizze_collection.find().toArray();
    return res.status(200).json(pizze);
  }
  try {
    let pizze = await pizze_collection
      .find({ cijena: Number(cijena_query) })
      .toArray();
    res.status(200).json(pizze);
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.get("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  let pizza = await pizze_collection.findOne({ naziv: naziv_param });
  res.status(200).json(pizza);
});

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
  let obavezniKljucevi = ["kupac", "adresa", "broj_telefona", "narucene_pizze"];
  let obavezniKljuceviPizze = ["naziv", "količina", "veličina"];

  if (!obavezniKljucevi.every((kljuc) => kljuc in novaNarudzba)) {
    return res.status(400).json({ error: "Nedostaju obavezni ključevi" });
  }

  if (
    !novaNarudzba.narucene_pizze.every((stavka) =>
      obavezniKljuceviPizze.every((kljuc) => kljuc in stavka)
    )
  ) {
    return res
      .status(400)
      .json({ error: "Nedostaju obavezni ključevi u stavci narudžbe" });
  }
  if (
    !novaNarudzba.narucene_pizze.every((stavka) => {
      return (
        Number.isInteger(stavka.količina) &&
        stavka.količina > 0 &&
        ["mala", "srednja", "velika"].includes(stavka.veličina)
      );
    })
  ) {
    return res
      .status(400)
      .json({ error: "Neispravni podaci u stavci narudžbe" });
  }

  let pizze_collection = db.collection("pizze");
  let dostupnePizze = await pizze_collection.find().toArray();

  if (
    !novaNarudzba.narucene_pizze.every((stavka) =>
      dostupnePizze.some((pizza) => pizza.naziv === stavka.naziv)
    )
  ) {
    return res
      .status(400)
      .json({ error: "Odabrali ste pizzu koju nemamo u ponudi" });
  }

  try {
    let result = await narudzbe_collection.insertOne(novaNarudzba);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.patch("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  try {
    let result = await pizze_collection.updateMany(
      { cijena: { $lt: 15 } },
      {
        $inc: {
          cijena: 2,
        },
      }
    );
    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.patch("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  let novaCijena = req.body.cijena;
  try {
    let result = await pizze_collection.updateOne(
      { naziv: naziv_param },
      {
        $set: {
          cijena: novaCijena,
        },
      }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Pizza nije pronađena" });
    }
    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.get("/narudzbe", async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let narudzbe = await narudzbe_collection.find().toArray();
  if (narudzbe.length === 0) {
    return res.status(404).json({ error: "Nema narudžbi" });
  }
  res.status(200).json(narudzbe);
});

app.get("/narudzbe/:id", async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let id_param = req.params.id;
  let narudzba = await narudzbe_collection.findOne({
    _id: new ObjectId(id_param),
  });
  if (!narudzba) {
    return res.status(404).json({ error: "Narudžba nije pronađena" });
  }
  res.status(200).json(narudzba);
});

app.patch("/narudzbe/:id", async (req, res) => {
  let narudzbe_collection = db.collection("narudzbe");
  let id_param = req.params.id;
  let noviStatus = req.body.status;
  try {
    let result = await narudzbe_collection.updateOne(
      { _id: new ObjectId(id_param) },
      {
        $set: { status: noviStatus },
      }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Narudžba nije pronađena" });
    }
    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.put("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let noviMeni = req.body;
  try {
    await pizze_collection.deleteMany({});
    let result = await pizze_collection.insertMany(noviMeni);
    res.status(200).json({ insertedCount: result.insertedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.delete("/pizze", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  try {
    let result = await pizze_collection.deleteMany({});
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.log(error.errorResponse);
    res.status(400).json({ error: error.errorResponse });
  }
});

app.delete("/pizze/:naziv", async (req, res) => {
  let pizze_collection = db.collection("pizze");
  let naziv_param = req.params.naziv;
  try {
    let result = await pizze_collection.deleteOne({ naziv: naziv_param });
    res.status(200).json({ deletedCount: result.deletedCount });
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
