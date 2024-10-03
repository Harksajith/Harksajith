const express = require('express');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Mock product API
app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'Product 1', price: 20.00 },
        { id: 2, name: 'Product 2', price: 30.00 }
    ];
    res.json(products);
});

// Start the server
app.listen(port, () => {
    console.log(`E-commerce app listening at http://localhost:${port}`);
});
