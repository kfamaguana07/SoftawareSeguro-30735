const db = require('../config/database');

class HotelRepository {
    async findAll() {
        const [rows] = await db.query('SELECT * FROM hoteles');
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query('SELECT * FROM hoteles WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async create(hotelData) {
        const { nombre, direccion, estrellas, telefono } = hotelData;
        const [result] = await db.query(
            'INSERT INTO hoteles (nombre, direccion, estrellas, telefono) VALUES (?, ?, ?, ?)',
            [nombre, direccion, estrellas || null, telefono || null]
        );
        return { id: result.insertId, ...hotelData };
    }

    async update(id, hotelData) {
        const { nombre, direccion, estrellas, telefono } = hotelData;
        const [result] = await db.query(
            'UPDATE hoteles SET nombre = ?, direccion = ?, estrellas = ?, telefono = ? WHERE id = ?',
            [nombre, direccion, estrellas || null, telefono || null, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await db.query('DELETE FROM hoteles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new HotelRepository();