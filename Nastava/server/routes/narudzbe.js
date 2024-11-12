import express from "express";
import { Proizvod, proizvodi } from "../data";

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
  
  let narduzbe = [];
  let dummy_narudzba = new Narudzba(1, [
    { id: 1, velicina: 'M', narucena_kolicina: 2 },
    { id: 3, velicina: 'onesize', narucena_kolicina: 1 }
  ]);

router.post("/", (req,res) => {
    let podaci = req.body;

    console.log('podaci:', podaci);

    res.status(201).json({message: 'Dodana narudzba'});
})

router.get("/", (req, res) => {
    res.status(200).json(narudzbe);
  });

export default router;