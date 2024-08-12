const ShoppingCartRepository = require("../repositories/shopping-cart-repository");
const HttpResponse = require("../utils/http-helper");

// Função para obter todos os itens do carrinho de compras
const getShoppingCartService = async () => {
    const data = await ShoppingCartRepository.findAllShoppingItem();
    let response = null;

    if (data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
};

// Função para obter um item do carrinho de compras pelo ID
const getShoppingCartByIdService = async (id) => {
    const data = await ShoppingCartRepository.findShoppingItemById(id);
    let response = null;

    if (data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
};

const createShoppingCartService = async (shoppingCart) => {
    let response = null;

    
    if (shoppingCart && Array.isArray(shoppingCart.items)) {
        for (const item of shoppingCart.items) {
            await ShoppingCartRepository.insertShoppingItem(item);
        }
        response = await HttpResponse.created();
    } else if (shoppingCart && typeof shoppingCart === 'object') {
        await ShoppingCartRepository.insertShoppingItem(shoppingCart);
        response = await HttpResponse.created();
    } else {
        response = await HttpResponse.badRequest();
    }

    return response;
};


// Função para atualizar um item do carrinho de compras pelo ID
const updateShoppingCartService = async (id, items) => {
    let response = null;
    const data = await ShoppingCartRepository.findModifyShoppingItemById(id, items);

    if (Object.keys(data).length === 0) {
        response = await HttpResponse.badRequest();
    } else {
        response = await HttpResponse.ok(data);
    }

    return response;
};

// Função para deletar um item do carrinho de compras pelo ID
const deleteShoppingCartService = async (id) => {
    let response = null;

    const isDeleted = await ShoppingCartRepository.deleteOneShoppingItem(id);

    if (isDeleted) {
        response = await HttpResponse.ok({ message: "Deletado" });
    } else {
        response = await HttpResponse.badRequest();
    }

    return response;
};

module.exports = {
    getShoppingCartService,
    getShoppingCartByIdService,
    createShoppingCartService,
    updateShoppingCartService,
    deleteShoppingCartService
};
