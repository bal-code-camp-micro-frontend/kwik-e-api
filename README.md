# kwik-e-api

<https://kwik-e-api.apps.baloise.dev>

## List API

| method | endpoint | description |
| - | - | - |
| `GET` | `/c/api/product?search=Name` | search products by name |
| `GET` | `/c/api/recommendation/:id` | get recommendations for product id |

## Detail API

| method | endpoint | description |
| - | - | - |
| `GET` | `/d/api/product/:id` | get product details |

## Checkout API

| method | endpoint | description |
| - | - | - |
| `GET` | `/c/api/product` | get all products in cart |
| `GET` | `/c/api/product/:id` | get product in cart |
| `HEAD` | `/c/api/product/:id` | get product in cart |
| `PUT` | `/c/api/product/:id` | add product to cart |
| `DELETE` | `/c/api/product/:id` | remove product from cart |
