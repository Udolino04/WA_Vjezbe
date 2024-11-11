import express from 'express';
const router = express.Router();

let nekretnine = [
  {
    id: 1,
    naziv: "Dvosoban stan",
    opis: "Prostrani stan u starome gradu.",
    cijena: 113000,
    lokacija: "Pazin",
    broj_soba: 2,
    povrsina: 89,
  },
];

router.get('/', (req, res) => {
  res.json(nekretnine);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) return res.status(404).json({ poruka: "Nekretnina nije pronađena" });
  res.json(nekretnina);
});

router.post('/', (req, res) => {
  const { id, naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (!id || !naziv || !cijena || !broj_soba || !povrsina) {
    return res.status(400).json({ poruka: "Molimo unesite sve podatke" });
  }
  if (cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res.status(400).json({ poruka: "Vrijednosti ne mogu biti negativne" });
  }
  const novaNekretnina = { id, naziv, opis, cijena, lokacija, broj_soba, povrsina };
  nekretnine.push(novaNekretnina);
  res.status(201).json(novaNekretnina);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (!naziv || cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res.status(400).json({ poruka: "Podaci su nepotpuni ili neispravni" });
  }

  nekretnine[index] = { id, naziv, opis, cijena, lokacija, broj_soba, povrsina };
  res.json(nekretnine[index]);
});

router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nekretnina = nekretnine.find(n => n.id === id);
  if (!nekretnina) return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  const { naziv, opis, cijena, lokacija, broj_soba, povrsina } = req.body;
  if (cijena < 0 || broj_soba < 0 || povrsina < 0) {
    return res.status(400).json({ poruka: "Cijena, broja soba i povrsina nekretnina moraju biti pozitivne" });
  }

  Object.assign(nekretnina, { naziv, opis, cijena, lokacija, broj_soba, povrsina });
  res.json(nekretnina);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = nekretnine.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ poruka: "Nekretnina nije pronađena" });

  nekretnine.splice(index, 1);
  res.status(204).end();
});

export default router;
