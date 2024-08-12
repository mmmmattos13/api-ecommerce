const ShoppingCart = require('../database/models').ShoppingCart;
const CartItem = require('../database/models').CartItem;

// Função para encontrar todos os itens do carrinho de compras
const findAllShoppingItem = async () => {
    const shoppingCart = await ShoppingCart.findOne({
        include: [{ model: CartItem, as: 'CartItems' }]
    });
    return shoppingCart;
};


// Função para encontrar um item do carrinho de compras pelo ID
const findShoppingItemById = async (id) => {
    const cartItem = await CartItem.findOne({ where: { id: id } });
    return cartItem || undefined;
};

// Função para adicionar um novo item ao carrinho de compras
const insertShoppingItem = async (newItem) => {
    let shoppingCart = await ShoppingCart.findOne();
    
    if (!shoppingCart) {
        shoppingCart = await ShoppingCart.create({ totalQuantity: 0, totalPrice: 0, currency: 'BRL' });
    }

    //const createdItem = await CartItem.create({ ...newItem, shoppingCartId: shoppingCart.id });
    
    //shoppingCart.totalQuantity += createdItem.quantity;
    //shoppingCart.totalPrice += createdItem.price * createdItem.quantity;
    
    await shoppingCart.save();
};

// Função para modificar um item do carrinho de compras pelo ID
const findModifyShoppingItemById = async (id, item) => {
    const cartItem = await CartItem.findOne({ where: { id: id } });
    
    if (!cartItem) {
        return {};
    }

    await cartItem.update(item);
    const shoppingCart = await ShoppingCart.findOne({ where: { id: cartItem.shoppingCartId } });

    // Recalcula o totalQuantity e totalPrice
    shoppingCart.totalQuantity = (await CartItem.sum('quantity', { where: { shoppingCartId: shoppingCart.id } }));
    shoppingCart.totalPrice = (await CartItem.sum('price', { where: { shoppingCartId: shoppingCart.id } }));
    await shoppingCart.save();

    return cartItem;
};

// Função para deletar um item do carrinho de compras pelo ID
const deleteOneShoppingItem = async (id) => {
    const cartItem = await CartItem.findOne({ where: { productId: id } });
    
    if (!cartItem) {
        return false;
    }

    const shoppingCart = await ShoppingCart.findOne({ where: { id: cartItem.shoppingCartId } });

    shoppingCart.totalQuantity -= cartItem.quantity;
    shoppingCart.totalPrice -= cartItem.price * cartItem.quantity;
    await shoppingCart.save();

    await CartItem.destroy({ where: { productId: id } });
    return true;
};

// Exporta as funções para uso em outros módulos
module.exports = {
    findAllShoppingItem,
    findShoppingItemById,
    insertShoppingItem,
    findModifyShoppingItemById,
    deleteOneShoppingItem
};
