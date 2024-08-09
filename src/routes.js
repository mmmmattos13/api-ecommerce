const Router = require("express").Router;
import * as GetItemController from "./controllers/cart-item-controller";
import * as ShoppingCartController from "./controllers/shopping-item-controller";

const router = Router()

router.get("/produtos", GetItemController.getCartItem)
router.get("/produtos/:productId", GetItemController.getCartItemById)
router.delete("/produtos/:productId", GetItemController.deleteCartItem)
router.put("/produtos/:productId", GetItemController.putCartItem)

router.post("/produtos", GetItemController.postCartItem)

router.get("/carrinho", ShoppingCartController.getShoppingCart);
router.get("/carrinho/:id", ShoppingCartController.getShoppingCartById);
router.delete("/carrinho/:id", ShoppingCartController.deleteShoppingCart);
router.put("/carrinho/:id", ShoppingCartController.putShoppingCart);
router.post("/carrinho", ShoppingCartController.postShoppingCart);

module.exports = router;