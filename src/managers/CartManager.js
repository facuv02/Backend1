import fs from 'fs/promises';

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carts = await this._readFile();

    const newCart = {
      id: crypto.randomUUID(),
      products: [],
    };

    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => c.id === id);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this._readFile();
    const cartIndex = carts.findIndex(c => c.id === cartId);
    if (cartIndex === -1) return null;

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex === -1) {
      cart.products.push({ product: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }

    await this._writeFile(carts);
    return cart;
  }
}

export default CartManager;
