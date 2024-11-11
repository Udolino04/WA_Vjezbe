import express from 'express';
import nekretnine from './nekretnine.js';
const router = express.Router();


let ponude = [];
let ponuda_id = 1;

router.post('/', (req, res) => {
  const { nekretnina_id, ime, prezime, ponudjena_cijena, broj_telefona } = req.body;
  if (!nekretnina_id || !ime || !prezime || !ponudjena_cijena || !broj_telefona) {
    return res.status(400).json({ poruka: "Molimo unesite sve podatke" });
  }

  const nekretnina = nekretnine.find(n => n.id === nekretnina_id);
  if (!nekretnina) {
    return res.status(404).json({ poruka: "Nekretnina s navedenim ID-em ne postoji" });
  }

  const nova_ponuda = {
    id: ponuda_id++,
    nekretnina_id,
    ime,
    prezime,
    ponudjena_cijena,
    broj_telefona,
  };
  ponude.push(nova_ponuda);
  res.status(201).json(nova_ponuda);
});

export default router;
