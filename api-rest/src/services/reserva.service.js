const reservaRepository = require('../repositories/reserva.repository');
const { ERROR_MESSAGES } = require('../utils/constants');

class ReservaService {
    async getAllReservas() {
        return await reservaRepository.findAll();
    }

    async getReservaById(id) {
        const reserva = await reservaRepository.findById(id);
        if (!reserva) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        return reserva;
    }

    async createReserva(data) {
        const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = data;
        
        if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        return await reservaRepository.create({
            fecha_entrada,
            fecha_salida,
            num_huespedes: num_huespedes || 1,
            hotel_id,
            cliente_id
        });
    }

    async updateReserva(id, data) {
        const { fecha_entrada, fecha_salida, num_huespedes, hotel_id, cliente_id } = data;
        
        if (!fecha_entrada || !fecha_salida || !hotel_id || !cliente_id) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        const existingReserva = await reservaRepository.findById(id);
        if (!existingReserva) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }

        const updated = await reservaRepository.update(id, {
            fecha_entrada,
            fecha_salida,
            num_huespedes: num_huespedes || 1,
            hotel_id,
            cliente_id
        });
        
        if (!updated) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return { 
            id, 
            fecha_entrada, 
            fecha_salida, 
            num_huespedes: num_huespedes || 1, 
            hotel_id, 
            cliente_id 
        };
    }

    async deleteReserva(id) {
        const existingReserva = await reservaRepository.findById(id);
        if (!existingReserva) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return await reservaRepository.delete(id);
    }
}

module.exports = new ReservaService();