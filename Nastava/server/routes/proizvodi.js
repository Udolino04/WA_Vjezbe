import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(proizvodi);
});

router.get("/:id", (req, res) => {
  let id_proizvod = res.params.id;

  if (isNaN(id_proizvod)) {
    return res.status(400).json({ message: "Krivi podaci" });
  }

  let proizvod = proizvodi.find((p) => (p.id = proizvodi.id));

  if (!proizvodi) {
    return res.status(404).json({ message: "proizvod nije pronadjen" });
  }
});

export default router;
