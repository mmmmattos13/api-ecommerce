const ShoppingCartService = require("../services/shopping-item-service");
const { noContent } = require("../utils/http-helper");

// Função para obter todos os itens do carrinho de compras
const getShoppingCart = async (req, res) => {
    const httpResponse = await ShoppingCartService.getShoppingCartService();
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para obter um carrinho de compras pelo ID
const getShoppingCartById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const httpResponse = await ShoppingCartService.getShoppingCartByIdService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para adicionar um carrinho de compras
const postShoppingCart = async (req, res) => {
    const bodyValue = req.body;

    const httpResponse = await ShoppingCartService.createShoppingCartService(bodyValue);

    if (httpResponse) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
        const response = await noContent();
        res.status(response.statusCode).json(response.body);
    }
};

// Função para atualizar um carrinho de compras
const putShoppingCart = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const bodyValue = req.body;

    const httpResponse = await ShoppingCartService.updateShoppingCartService(id, bodyValue);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

// Função para deletar um carrinho de compras
const deleteShoppingCart = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const httpResponse = await ShoppingCartService.deleteShoppingCartService(id);
    res.status(httpResponse.statusCode).json(httpResponse.body);
};

module.exports = {
    getShoppingCart,
    getShoppingCartById,
    postShoppingCart,
    putShoppingCart,
    deleteShoppingCart
};
