const CartItem = require('../database/models').CartItem;

// Função para encontrar todos os itens do carrinho
const findAllCartItem = async () => {
    return await CartItem.findAll();
};

// Função para encontrar um item do carrinho pelo ID
const findCartItemById = async (id) => {
    return await CartItem.findOne({ where: { id: id } });
};

// Função para adicionar um item ao carrinho
const insertCartItem = async (cartItemData) => {
    return await CartItem.create(cartItemData);
};

// Função para modificar um item do carrinho pelo ID
const findModifyCartItemById = async (id, updatedData) => {
    const cartItem = await CartItem.findOne({ where: { id: id } });
    if (!cartItem) {
        return {}; 
    }

    return await cartItem.update(updatedData);
};

// Função para deletar um item do carrinho pelo ID
const deleteOneCartItem = async (id) => {
    const result = await CartItem.destroy({ where: { id: id } });
    return result > 0; // Retorna true se algo foi deletado
};

// Exporta as funções para uso em outros módulos
module.exports = {
    findAllCartItem,
    findCartItemById,
    insertCartItem,
    findModifyCartItemById,
    deleteOneCartItem
};
