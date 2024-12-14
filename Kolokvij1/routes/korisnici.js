import express from "express";
import fs from "fs/promises";

const router = express.Router();

async function citaj() {
  const korisnici = await fs.readFile("data.json", "utf8");
  if (!korisnici) {
    return error;
  }

  return JSON.parse(korisnici);
}

async function dodaj(korisnik) {
  await fs.writeFile("data.json", JSON.stringify(korisnik), "utf8");
}

router.get("/korisnici", async (req, res) => {
  let ime = req.query.ime;
  let prezime = req.query.prezime;

  try {
    let korisnici = await citaj();
    if (!korisnici) {
      return res.status(404).send("nije dohvatilo");
    }

    if (ime) {
      let korisnik = korisnici.filter((i) => i.ime.toLowerCase() === ime.toLowerCase());
      return res.status(200).json(korisnik)
    }

    if (prezime) {
      let kor = korisnici.filter((p) => p.prezime.toLowerCase() === prezime.toLowerCase());
      return res.status(200).json(kor)
    }

    return res.status(200).json(korisnici);
  } catch (error) {
    res.status(400).send("Greška prilikom dohvata podataka");
  }
});

router.post("/korisnici", async (req, res) => {
  let korisnik = req.body;
  let atributi = ["id", "ime", "prezime"];

  for (let a of korisnik) {
    if (!Object.keys(korisnik).includes(a)) {
      res.status(400).send("Greska nema atributa " + a);
      return;
    }
  }

  try {
    let korisnici = await citaj();

    //let provjera = korisnici.find((k) => k.id == korisnik.id);

    //if (provjera) {
      //res.status(400).send("ID nije unique");
      //return;
    //}

    let index = korisnici.length;

    while (korisnici.find((k) => k.id == index)){
      index++
    }

    korisnik.id = index;

    korisnici.push(korisnik);

    await dodaj(korisnici);

    res.status(200).json(korisnici);
  } catch {
    res.status(400).send("greska");
  }
});

router.get("/korisnici/:id", async (req, res) => {
  let korisnici = await citaj();
  const id = req.params.id;
  const korisnik = korisnici.find((k) => k.id == id);

  if (!korisnik) {
    res.status(404).send("ERROR");
    return;
  }
  res
    .status(200)
    .send({ message: `Uspjesno dohvacen korsinik s idem ${id}`, korisnik });
});

export default router;
