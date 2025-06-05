import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');


router.post('/', async (req, res) => {
  const newCart = await cartManager.createCart();
  res.status(201).json(newCart);
});


router.get('/:cid', async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  cart ? res.json(cart) : res.status(404).json({ error: 'Carrito no encontrado' });
});


router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const result = await cartManager.addProductToCart(cid, pid);
  result ? res.json(result) : res.status(404).json({ error: 'Carrito o producto no encontrado' });
});

export default router;
