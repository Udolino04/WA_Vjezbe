class Proizvod {
  constructor(id, naziv, cijena, velicine, opis, slike) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
    this.opis = opis;
    this.slike = slike;
  }
}
const proizvodi = [
  new Proizvod(
    1,
    "Obična crna majica",
    80,
    ["XS", "S", "M", "L"],
    "Obicna crna majica",
    [
      "https://i00.eu/img/726/1024x1024/2ul0znjr/18488.jpg",
      "https://i00.eu/img/726/1024x1024/2ul0znjr/18488.jpg",
      "https://i00.eu/img/726/1024x1024/2ul0znjr/18488.jpg",
      "https://i00.eu/img/726/1024x1024/2ul0znjr/18488.jpg",
    ]
  ),
  new Proizvod(
    2,
    "Levi's 501 traperice",
    110,
    ["S", "M", "L"],
    "Levis traperice",
    [
      "https://europa92.eu/upload/catalog/product/6930/thumb/2e564484-68e4-42f1-9491-7f9d98c222ec_661b1f00e2b74_990xr.webp",
      "https://europa92.eu/upload/catalog/product/6930/thumb/2e564484-68e4-42f1-9491-7f9d98c222ec_661b1f00e2b74_990xr.webp",
      "https://europa92.eu/upload/catalog/product/6930/thumb/2e564484-68e4-42f1-9491-7f9d98c222ec_661b1f00e2b74_990xr.webp",
      "https://europa92.eu/upload/catalog/product/6930/thumb/2e564484-68e4-42f1-9491-7f9d98c222ec_661b1f00e2b74_990xr.webp",
    ]
  ),
  new Proizvod(3, "Zimska kapa", 40, "onesize", "Zimska kapa", [
    "https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/1/8187O-MLC-010-1-565071_3.jpg",
    "https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/1/8187O-MLC-010-1-565071_3.jpg",
    "https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/1/8187O-MLC-010-1-565071_3.jpg",
    "https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/8/1/8187O-MLC-010-1-565071_3.jpg",
  ]),
  new Proizvod(
    4,
    "Čarape Adidas",
    20,
    ["34-36", "37-39", "40-42"],
    "Carape adidas",
    [
      "https://www.google.com/imgres?q=carape%20adidas&imgurl=https%3A%2F%2Fimg01.ztat.net%2Farticle%2Fspp-media-p1%2Fb8257221318f474d9ecf726faf4bf6c7%2Fc80724d8789845bb826bfcb1c966327b.jpg%3Fimwidth%3D1800%26filter%3Dpackshot&imgrefurl=https%3A%2F%2Fwww.zalando.hr%2Fadidas-originals-solid-crew-3-pack-unisex-carape-black-ad181003y-q12.html&docid=eXj-o-zjj5nloM&tbnid=Hg_jAnffV5_cTM&vet=12ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA..i&w=1801&h=2600&hcb=2&ved=2ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA",
      "https://www.google.com/imgres?q=carape%20adidas&imgurl=https%3A%2F%2Fimg01.ztat.net%2Farticle%2Fspp-media-p1%2Fb8257221318f474d9ecf726faf4bf6c7%2Fc80724d8789845bb826bfcb1c966327b.jpg%3Fimwidth%3D1800%26filter%3Dpackshot&imgrefurl=https%3A%2F%2Fwww.zalando.hr%2Fadidas-originals-solid-crew-3-pack-unisex-carape-black-ad181003y-q12.html&docid=eXj-o-zjj5nloM&tbnid=Hg_jAnffV5_cTM&vet=12ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA..i&w=1801&h=2600&hcb=2&ved=2ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA",
      "https://www.google.com/imgres?q=carape%20adidas&imgurl=https%3A%2F%2Fimg01.ztat.net%2Farticle%2Fspp-media-p1%2Fb8257221318f474d9ecf726faf4bf6c7%2Fc80724d8789845bb826bfcb1c966327b.jpg%3Fimwidth%3D1800%26filter%3Dpackshot&imgrefurl=https%3A%2F%2Fwww.zalando.hr%2Fadidas-originals-solid-crew-3-pack-unisex-carape-black-ad181003y-q12.html&docid=eXj-o-zjj5nloM&tbnid=Hg_jAnffV5_cTM&vet=12ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA..i&w=1801&h=2600&hcb=2&ved=2ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA",
      "https://www.google.com/imgres?q=carape%20adidas&imgurl=https%3A%2F%2Fimg01.ztat.net%2Farticle%2Fspp-media-p1%2Fb8257221318f474d9ecf726faf4bf6c7%2Fc80724d8789845bb826bfcb1c966327b.jpg%3Fimwidth%3D1800%26filter%3Dpackshot&imgrefurl=https%3A%2F%2Fwww.zalando.hr%2Fadidas-originals-solid-crew-3-pack-unisex-carape-black-ad181003y-q12.html&docid=eXj-o-zjj5nloM&tbnid=Hg_jAnffV5_cTM&vet=12ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA..i&w=1801&h=2600&hcb=2&ved=2ahUKEwi5k6Dn3OWJAxVP9wIHHQIQI1UQM3oECGkQAA",
    ]
  ),
  new Proizvod(
    5,
    "Tenisice Nike",
    200,
    ["38", "39", "40", "41", "42", "43", "44", "45"],
    "Tenisice nike",
    [
      "https://www.google.com/imgres?q=tenisice%20nike&imgurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ffiles%2Fthumbs%2Ffiles%2Fimages%2Fslike-proizvoda%2Fmedia%2FDZ4%2FDZ4510-100%2Fimages%2Fthumbs_800%2FDZ4510-100_800_800px.jpg&imgrefurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ftenisice%2F258154-nike-tenisice-air-force-1-low-07&docid=lbcPYiByt7cMEM&tbnid=2xYkl2t_3ZhIZM&vet=12ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA",
      "https://www.google.com/imgres?q=tenisice%20nike&imgurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ffiles%2Fthumbs%2Ffiles%2Fimages%2Fslike-proizvoda%2Fmedia%2FDZ4%2FDZ4510-100%2Fimages%2Fthumbs_800%2FDZ4510-100_800_800px.jpg&imgrefurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ftenisice%2F258154-nike-tenisice-air-force-1-low-07&docid=lbcPYiByt7cMEM&tbnid=2xYkl2t_3ZhIZM&vet=12ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA",
      "https://www.google.com/imgres?q=tenisice%20nike&imgurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ffiles%2Fthumbs%2Ffiles%2Fimages%2Fslike-proizvoda%2Fmedia%2FDZ4%2FDZ4510-100%2Fimages%2Fthumbs_800%2FDZ4510-100_800_800px.jpg&imgrefurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ftenisice%2F258154-nike-tenisice-air-force-1-low-07&docid=lbcPYiByt7cMEM&tbnid=2xYkl2t_3ZhIZM&vet=12ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA",
      "https://www.google.com/imgres?q=tenisice%20nike&imgurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ffiles%2Fthumbs%2Ffiles%2Fimages%2Fslike-proizvoda%2Fmedia%2FDZ4%2FDZ4510-100%2Fimages%2Fthumbs_800%2FDZ4510-100_800_800px.jpg&imgrefurl=https%3A%2F%2Fwww.buzzsneakers.hr%2Ftenisice%2F258154-nike-tenisice-air-force-1-low-07&docid=lbcPYiByt7cMEM&tbnid=2xYkl2t_3ZhIZM&vet=12ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwiGjri13OWJAxX5xgIHHUoWLL0QM3oECBYQAA",
    ]
  ),
];
export { proizvodi, Proizvod };
