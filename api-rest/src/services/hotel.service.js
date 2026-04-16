const hotelRepository = require('../repositories/hotel.repository');
const { ERROR_MESSAGES } = require('../utils/constants');

class HotelService {
    async getAllHoteles() {
        return await hotelRepository.findAll();
    }

    async getHotelById(id) {
        const hotel = await hotelRepository.findById(id);
        if (!hotel) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        return hotel;
    }

    async createHotel(data) {
        const { nombre, direccion, estrellas, telefono } = data;
        
        if (!nombre || !direccion) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        return await hotelRepository.create({ nombre, direccion, estrellas, telefono });
    }

    async updateHotel(id, data) {
        const { nombre, direccion, estrellas, telefono } = data;
        
        if (!nombre || !direccion) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        const existingHotel = await hotelRepository.findById(id);
        if (!existingHotel) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }

        const updated = await hotelRepository.update(id, { nombre, direccion, estrellas, telefono });
        if (!updated) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return { id, nombre, direccion, estrellas, telefono };
    }

    async deleteHotel(id) {
        const existingHotel = await hotelRepository.findById(id);
        if (!existingHotel) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return await hotelRepository.delete(id);
    }
}

module.exports = new HotelService();