const { Router } = require('express');
const router = Router();
const Producto = require('../models/Producto');

router.get('/productos', async (req, res) => {
    try {
      const productos = await Producto.find();
  
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

router.post('/productos', async (req, res) => {
  try {
    const { nombre, descripcion, rutaimg } = req.body;

    const productoExistente = await Producto.findOne({ nombre });

    if (productoExistente) {
      return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      rutaimg
    });

    await nuevoProducto.save();

    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

module.exports = router;