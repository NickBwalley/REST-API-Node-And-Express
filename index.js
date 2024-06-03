const express = require("express");
const crypto = require("crypto");

const app = express();

app.use(express.json());

const products = [
  {
    id: "9779af68-c227-4bdc-9da0-a3e410583e3a",
    name: "Laptop",
    price: 400,
    quantity: 4,
    active: true,
  },
  {
    id: "9779af68-c227-4bdc-9da0-a3e410583e4a",
    name: "Keboard",
    price: 29.99,
    quantity: 10,
    active: true,
  },
  {
    id: "9779af68-c227-4bdc-9da0-a3e410583e5a",
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
  res.status(200).json(products);
});

app.post("/products", (req, res) => {
  const { name, price, quantity, active } = req.body;

  if (!name) {
    return res.status(422).json({ message: "Name is required!" });
  }

  const id = crypto.randomUUID();

  products.push({
    id,
    name,
    price,
    quantity,
    active,
  });

  res.status(201).json({ message: "product created successfully!", id });
});

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => product.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  res.status(200).json(product);
});

app.listen(3000, () => console.log("Server started on port 3000"));
