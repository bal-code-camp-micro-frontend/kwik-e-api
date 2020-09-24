const data = require('./data.json');

module.exports.getProduct = (req, res) => {
    const productId = req.params.id
    const product = data.filter(d => d.id == productId)[0]
    if (!product) {
        res.status(404).send('Product not found')
    }
    res.json(product)
}
