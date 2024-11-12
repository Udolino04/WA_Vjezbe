import express from "express";

import proizvodi_router from './routes/proizvodi.js';
import narudzbe_router from './routes/narudzbe.js';

const app = express();
let PORT = 3000;

app.use(express.json());
app.use('/proizvodi', proizvodi_router);
app.use('/narudzbe', narudzbe_router);

app.get("/", (req, res) => {
  res.send("Majmun")
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});