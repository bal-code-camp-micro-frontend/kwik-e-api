"use strict";

const express = require('express')
const { v4: uuidv4 } = require('uuid');
const cookieSession = require('cookie-session')
const nocache = require('nocache')
const { apiAddCartProduct, apiHeadCartProduct, apiGetCartProduct, apiGetAllCartProducts, apiRemoveCartProduct} = require('./checkoutApi');
const { mockCheckoutCart } = require('./cart');
const app = express()
const port = 3003

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
    console.log(`Checkout API product 1 => http://localhost:${port}/c/api/product/1`)
})
