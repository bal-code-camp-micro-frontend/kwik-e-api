const data = require('./data.json');

module.exports.findAllProducts = (req, res) => {
    res.json(filterProducts(req.query.search) || []);
}

module.exports.findAllRecommendations = (req, res) => {
    const id = req.params.id
    res.json(filterRecommendations(id, res))
}

function filterRecommendations(id, res) {
    if (!id) {
        res.status(400).send('ID is missing')
    }

    const product = data.filter(d => d.id == id)[0]
    if (!product) {
        res.status(404).send('Product not found')
    }
    return data
        .filter(item => item.id !== product.id)
        .filter(item => item.type === product.type)
        .slice(0, 4)
}

function filterProducts(searchTerm) {
    let list = data
    if (searchTerm) {
        list = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return list
}