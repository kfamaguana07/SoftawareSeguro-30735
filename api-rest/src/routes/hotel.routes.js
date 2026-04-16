const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');

/**
 * @swagger
 * /api/hoteles:
 *   get:
 *     summary: Lista todos los hoteles
 *     tags: [Hoteles]
 *     responses:
 *       200:
 *         description: Lista de hoteles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hotel'
 */
router.get('/', hotelController.getAll);

/**
 * @swagger
 * /api/hoteles/{id}:
 *   get:
 *     summary: Obtiene un hotel por ID
 *     tags: [Hoteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hotel encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Hotel'
 */
router.get('/:id', hotelController.getById);

/**
 * @swagger
 * /api/hoteles:
 *   post:
 *     summary: Crea un nuevo hotel
 *     tags: [Hoteles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotelInput'
 *     responses:
 *       201:
 *         description: Hotel creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Hotel'
 */
router.post('/', hotelController.create);

/**
 * @swagger
 * /api/hoteles/{id}:
 *   put:
 *     summary: Actualiza un hotel
 *     tags: [Hoteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HotelInput'
 *     responses:
 *       200:
 *         description: Hotel actualizado
 */
router.put('/:id', hotelController.update);

/**
 * @swagger
 * /api/hoteles/{id}:
 *   delete:
 *     summary: Elimina un hotel
 *     tags: [Hoteles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hotel eliminado
 */
router.delete('/:id', hotelController.delete);

module.exports = router;
