const CartItemService = require("../services/cart-item-service");
const { noContent } = require("../utils/http-helper");

// Função para obter todos os itens do carrinho
const getCartItem = async (req, res) => {
    const httpResponse = await CartItemService.getCartItemService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para obter um item do carrinho pelo ID
const getCartItemById = async (req, res) => {
    const id = parseInt(req.params.productId, 10);
    const httpResponse = await CartItemService.getCartItemByIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para adicionar um item ao carrinho
const postCartItem = async (req, res) => {
    const bodyValue = req.body;

    const httpResponse = await CartItemService.createCartItemService(bodyValue);

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
        const response = await noContent();
        res.status(response.statusCode).json(response.body);
    }
};

// Função para atualizar um item do carrinho
const putCartItem = async (req, res) => {
    const id = parseInt(req.params.productId, 10);
    const bodyValue = req.body;

    const httpResponse = await CartItemService.updateCartItemService(id, bodyValue);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para deletar um item do carrinho
const deleteCartItem = async (req, res) => {
    const id = parseInt(req.params.productId, 10);
    const httpResponse = await CartItemService.deleteCartItemService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

module.exports = {
    getCartItem,
    getCartItemById,
    postCartItem,
    putCartItem,
    deleteCartItem
};
