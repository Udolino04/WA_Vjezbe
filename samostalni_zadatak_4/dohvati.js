import express from "express";
import fs from "fs/promises";

const router = express.Router();

router.get("/zaposlenici", async (req, res) => {
  const radnik = req.query;
  try {
    const pod = await fs.readFile("zaposlenici.json", "utf8");
    let zaposlenici = JSON.parse(pod);
    Object.keys(radnik).forEach((x) => {
      switch (x) {

        // ne dela popravit
        case "sortiraj_po_godinama":
            if (radnik.sortiraj_po_godinama === "uzlazno") {
              zaposlenici.sort((a, b) => a.godine_staza - b.godine_staza);
            } else if (radnik.sortiraj_po_godinama === "silazno") {
            zaposlenici.sort((a, b) => b.godine_staza - a.godine_staza);
            }
          break;
        
          //dela ako se tocno upise veliko slovo dodat tolowercase funkciju mozda???
        case "pozicija":
          zaposlenici = zaposlenici.filter((zaposlenik) => zaposlenik.pozicija.ToLowerCase() === radnik.pozicija.ToLowerCase());
          break;

          // dela na foru da se upise minimalne godine rada npr 10 i ispisat ce sve koji imaju minimalno 10 godina staza 
        case "godine_staza_min":
          zaposlenici = zaposlenici.filter((zaposlenik) => zaposlenik.godine_staza >= Number(radnik.godine_staza_min));
          break;

          // isto ko za min 
        case "godine_staza_max":
          zaposlenici = zaposlenici.filter((zaposlenik) => zaposlenik.godine_staza <= Number(radnik.godine_staza_max));
          break;

        default:
          break;
      }
    });
    res.status(200).send(zaposlenici);
  } catch (error) {
    res.status(500).send("Podaci nisu dobro dohvaceni.");
  }
});

router.get("/zaposlenici/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const zaposlenici = await fs.readFile("zaposlenici.json", "utf8");
    const zaposlenik = JSON.parse(zaposlenici).find((z) => z.id == id);
    if (zaposlenik) {
      res.status(200).send(zaposlenik);
    } else res.status(400).send("Ne postoji taj ID");
  } catch (error) {
    console.log("ERROR");
    res.status(500).send("Podaci nisu dobro dohvaceni.");
  }
});

router.post("/dodaj", async (req, res) => {
  const novi_zaposlenik = req.body;
  try {
    const zaposlenici = await fs.readFile("zaposlenici.json", "utf8");
    const nz = JSON.parse(zaposlenici);
    nz.push(novi_zaposlenik);
    await fs.writeFile("zaposlenici.json", JSON.stringify(nz), "utf8");
    res.status(201).send(nz);
  } catch (error) {
    console.log("ERROR");
    res.status(500).send(error);
  }
});

export default router;
