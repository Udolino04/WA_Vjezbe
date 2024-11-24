import express from "express";
import {pizze} from "./pizze.js";

let narudzbe = [];

const router = express.Router();

router.get("/", (req, res) => {
  res.json(narudzbe);
});

export { router as default, narudzbe };
