"use strict";

const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cookieSession = require('cookie-session')
const cors = require('cors')
const nocache = require('nocache')
const { apiAddCartProduct, apiHeadCartProduct, apiGetCartProduct, apiGetAllCartProducts, apiRemoveCartProduct} = require('./checkoutApi');
const { findAllProducts, findAllRecommendations} = require('./listApi')
const { getProduct } = require('./detailApi')
const { mockCheckoutCart } = require('./cart');
const app = express()
const port = 3003

app.use(cors())

app.use(cookieSession({
    name: 'session',
    keys: ['kwik-e-mart'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/c/api', (req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = uuidv4()
        mockCheckoutCart(req.session.userId)
    }
    next()
})

const listApiRouter = express.Router()
listApiRouter.use(nocache())
listApiRouter.get('/product', findAllProducts)
listApiRouter.get('/recommendation/:id', findAllRecommendations)
app.use('/l/api', listApiRouter)

const detailApiRouter = express.Router()
detailApiRouter.use(nocache())
detailApiRouter.get('/product/:id', getProduct)
app.use('/d/api', detailApiRouter)

const checkoutApiRouter = express.Router()
checkoutApiRouter.use(nocache())
checkoutApiRouter.get('/product', apiGetAllCartProducts)
checkoutApiRouter.get('/product/:id', apiGetCartProduct)
checkoutApiRouter.head('/product/:id', apiHeadCartProduct)
checkoutApiRouter.put('/product/:id', apiAddCartProduct)
checkoutApiRouter.delete('/product/:id', apiRemoveCartProduct)
app.use('/c/api', checkoutApiRouter)

app.get('/healthz', (_, res) => res.send('ok'))

app.listen(port, () => {
    console.log(`Healthz => http://localhost:${port}/healthz`)
    console.log(`List API => http://localhost:${port}/l/api/product?search=krusty`)
    console.log(`Detail API => http://localhost:${port}/d/api/product/1`)
    console.log(`Checkout API  => http://localhost:${port}/c/api/product`)
})
