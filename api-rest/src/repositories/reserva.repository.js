const db = require('../config/database');

class ReservaRepository {
    async findAll() {
        const [rows] = await db.query(`
            SELECT r.*, h.nombre as hotel_nombre, c.nombre as cliente_nombre 
            FROM reservas r 
            JOIN hoteles h ON r.hotel_id = h.id 
            JOIN clientes c ON r.cliente_id = c.id
        `);
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query(`
            SELECT r.*, h.nombre as hotel_nombre, c.nombre as cliente_nombre 
            FROM reservas r 
            JOIN hoteles h ON r.hotel_id = h.id 
            JOIN clientes c ON r.cliente_id = c.id
            WHERE r.id = ?
        `, [id]);
        return rows[0] || null;
    }

    async create(reservaData) {
        const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = reservaData;
        const [result] = await pool.query(
            'INSERT INTO reservas (fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id) VALUES (?, ?, ?, ?, ?)',
            [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id]
        );
        return { id: result.insertId, ...reservaData };
    }

    async update(id, reservaData) {
        const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = reservaData;
        const [result] = await pool.query(
            'UPDATE reservas SET fecha_entrada = ?, fecha_salida = ?, num_huespedes = ?, hotel_id = ?, cliente_id = ? WHERE id = ?',
            [fecha_entrada, fecha_salida, num_huespedes || 1, hotel_id, cliente_id, id]
        );
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = new ReservaRepository();