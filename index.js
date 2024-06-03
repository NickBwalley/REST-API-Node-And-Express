const express = require("express");

const app = express();

app.use(express.json());

const products = [
  {
    name: "Laptop",
    price: 400.0,
    quantity: 4,
    active: true,
  },
  {
    name: "Keboard",
    price: 29.99,
    quantity: 10,
    active: true,
  },
  {
    name: "Mouse",
    price: 19.99,
    quantity: 14,
    active: true,
  },
];

app.get("/", (req, res) => {
  res.send("hello world...");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(3000, () => console.log("Server started on port 3000"));
