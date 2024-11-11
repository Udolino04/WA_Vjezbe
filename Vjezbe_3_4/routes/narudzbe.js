import express from "express";

const pizze = [
  { id: 1, naziv: "Margherita", cijena: 6.5 },
  { id: 2, naziv: "Capricciosa", cijena: 8.0 },
  { id: 3, naziv: "Quattro formaggi", cijena: 10.0 },
  { id: 4, naziv: "Šunka sir", cijena: 7.0 },
  { id: 5, naziv: "Vegetariana", cijena: 9.0 },
];

let narudzbe = [];

router.get("/", (req, res) => {
  res.json(narudzbe);
});

router.post("/naruci", (req, res) => {
  const { narudzba, klijent } = req.body;

  if (
    !narudzba ||
    !klijent ||
    !klijent.prezime ||
    !klijent.adresa ||
    !klijent.broj_telefona
  ) {
    return res.status(400).json({
      error:
        "Niste poslali sve potrebne podatke. Očekuju se narudzba, prezime, adresa i broj_telefona.",
    });
  }

  const invalidPizzas = narudzba.filter(
    (item) => !pizze.some((pizza) => pizza.pizza === item.pizza)
  );
  if (invalidPizzas.length > 0) {
    return res.status(400).json({
      error: `Jedna ili više pizza koje ste naručili nisu dostupne: ${invalidPizzas
        .map((item) => item.pizza)
        .join(", ")}`,
    });
  }

  let ukupnaCijena = 0;
  narudzba.forEach((item) => {
    const pizza = pizze.find((pizza) => pizza.pizza === item.pizza);
    ukupnaCijena += pizza.cijena * item.kolicina;
  });

  narudzbe.push({ narudzba, klijent, ukupnaCijena });

  const pizzaNames = narudzba
    .map((item) => `${item.pizza} (${item.velicina})`)
    .join(" i ");
  res.status(200).json({
    message: `Vaša narudžba za ${pizzaNames} je uspješno zaprimljena!`,
    prezime: klijent.prezime,
    adresa: klijent.adresa,
    ukupna_cijena: ukupnaCijena,
  });
});

export { router as default, narudzbe };
