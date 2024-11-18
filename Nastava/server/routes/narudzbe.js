import express from "express";
import { Proizvod, proizvodi } from "../data.js";

const router = express.Router();

class Narudzba {
    constructor(id, naruceni_proizvodi) {
      this.id = id;
      this.naruceni_proizvodi = naruceni_proizvodi;
    }
    get ukupnaCijena() {
      let ukupno = this.naruceni_proizvodi.reduce((suma, trenutni_proizvod) => {
        let proizvod_obj = proizvodi.find(p => p.id == trenutni_proizvod.id);
        return suma + proizvod_obj.cijena * trenutni_proizvod.narucena_kolicina;
      }, 0);
      return ukupno;
    }
  }
  
  let dummy_narudzba = new Narudzba(1, [
    { id: 1, velicina: 'M', narucena_kolicina: 2 },
    { id: 3, velicina: 'onesize', narucena_kolicina: 1 }
  ]);

  let narduzbe = [];

  router.post('/', (req, res) => {
    let podaci = req.body;
    
    let naruceni_proizvodi = podaci.naruceni_proizvodi;
    if (!Array.isArray(naruceni_proizvodi) || naruceni_proizvodi.length == 0) {
    return res.status(400).json({ message: 'Nema podataka' });
    }
    let latest_id = narudzbe.length ? narudzbe.at(-1).id + 1 : 1;
    let narudzba_obj = new Narudzba(latest_id, naruceni_proizvodi);
    narudzbe.push(narudzba_obj);
    return res.status(201).json(podaci);
    });

router.get("/", (req, res) => {
    res.status(200).json(narudzbe);
  });

export default router;