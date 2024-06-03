const crypto = require("crypto");

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

exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};

exports.createProduct = (req, res) => {
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
};

exports.getProductById = (req, res) => {
  const product = products.find((product) => product.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  res.status(200).json(product);
};

exports.updatProduct = (req, res) => {
  const product = products.find((product) => product.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }

  const { name, price, quantity, active } = req.body;

  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = price;
  }
  if (quantity) {
    product.quantity = quantity;
  }
  if ("active" in req.body) {
    product.active = active;
  }

  res.status(200).json({ message: "product updated successfully!" });
};

exports.deleteProduct = (req, res) => {
  const productIndex = products.findIndex(
    (product) => product.id == req.params.id
  );
  if (productIndex == -1)
    return res.status(404).json({ message: "Product not found!" });

  products.splice(productIndex, 1);

  res.status(200).json({ message: "Product deleted successfully! " });
};
