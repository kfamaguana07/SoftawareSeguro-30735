const hotelService = require('../services/hotel.service');
const ApiResponse = require('../utils/ApiResponse');

class HotelController {
    async getAll(req, res, next) {
        try {
            const hoteles = await hotelService.getAllHoteles();
            res.status(200).json(ApiResponse.success(hoteles));
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const hotel = await hotelService.getHotelById(req.params.id);
            res.status(200).json(ApiResponse.success(hotel));
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const hotel = await hotelService.createHotel(req.body);
            res.status(201).json(ApiResponse.created(hotel));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const hotel = await hotelService.updateHotel(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(hotel, 'Hotel actualizado correctamente'));
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await hotelService.deleteHotel(req.params.id);
            res.status(200).json(ApiResponse.success(null, 'Hotel eliminado correctamente'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HotelController();