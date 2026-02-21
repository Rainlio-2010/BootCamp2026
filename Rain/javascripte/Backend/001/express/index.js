const express = require("express");
const app = express();
const port = 3000;

const Joi = require("joi");

app.use(express.json());


let products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
];

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/products ", (req, res) => {
    res.send(products);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given ID was not found.");
    res.send(product);
});

app.put("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given ID was not found.");
    const { error, value } = validateProduct(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    product.name = value.name;
    product.price = value.price;
    res.send(product);
});

app.delete("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send("The product with the given ID was not found.");
    const index = products.indexOf(product);
    products.splice(index, 1);
    res.send(product);
});


app.post("/api/products", (req, res) => {
    const { error, value } = validateProduct(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const product = {
        id: products.length + 1,
        name: value.name,
        price: value.price,
    }
    products.push(product);
    res.send(product);
})

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        price: Joi.number().required(),
    })
    return schema.validate(product);
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));