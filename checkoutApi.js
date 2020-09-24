const { findProducts, addProduct, removeProduct } = require('./cart.js');

function toArray(map) {
    const array = []
    map.forEach(item => array.push(item))
    return array
}

module.exports.apiGetAllCartProducts = (req, res) => {
    const products = findProducts(req.session.userId)
    res.json(toArray(products))
}

module.exports.apiGetCartProduct = (req, res) => {
    const products = findProducts(req.session.userId)
    if (products.has(parseInt(req.params.id, 10))) {
        res.json(products.get(parseInt(req.params.id, 10)))
    } else {
        res.status(404).send('Not found')
    }
}

module.exports.apiHeadCartProduct = (req, res) => {
    const products = findProducts(req.session.userId)
    if (products.has(parseInt(req.params.id, 10))) {
        res.send()
    } else {
        res.status(404).send()
    }
}

module.exports.apiAddCartProduct = (req, res) => {
    addProduct(req.session.userId, req.params.id)
    res.json()
}

module.exports.apiRemoveCartProduct = (req, res) => {
    removeProduct(req.session.userId, req.params.id)
    res.json()
}
