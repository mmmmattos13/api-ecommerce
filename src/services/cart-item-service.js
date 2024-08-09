const CartItemRepository = require("../repositories/cart-item-repository");
const HttpResponse = require("../utils/http-helper");

// Função para obter todos os itens do carrinho
const getCartItemService = async () => {
    const data = await CartItemRepository.findAllCartItem();
    let response = null;

    if (data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
};

// Função para obter um item do carrinho pelo ID
const getCartItemByIdService = async (id) => {
    const data = await CartItemRepository.findCartItemById(id);
    let response = null;

    if (data) {
        response = await HttpResponse.ok(data);
    } else {
        response = await HttpResponse.noContent();
    }

    return response;
};

// Função para criar um novo item no carrinho
const createCartItemService = async (cartItem) => {
    let response = null;

    if (Object.keys(cartItem).length !== 0) {
        await CartItemRepository.insertCartItem(cartItem);
        response = await HttpResponse.created();
    } else {
        response = await HttpResponse.badRequest();
    }

    return response;
};

// Função para atualizar um item do carrinho pelo ID
const updateCartItemService = async (id, items) => {
    let response = null;
    const data = await CartItemRepository.findModifyCartItemById(id, items);

    if (Object.keys(data).length === 0) {
        response = await HttpResponse.badRequest();
    } else {
        response = await HttpResponse.ok(data);
    }

    return response;
};

// Função para deletar um item do carrinho pelo ID
const deleteCartItemService = async (id) => {
    let response = null;

    const isDeleted = await CartItemRepository.deleteOneCartItem(id);

    if (isDeleted) {
        response = await HttpResponse.ok({ message: "deletado" });
    } else {
        response = await HttpResponse.badRequest();
    }

    return response;
};

module.exports = {
    getCartItemService,
    getCartItemByIdService,
    createCartItemService,
    updateCartItemService,
    deleteCartItemService
};
