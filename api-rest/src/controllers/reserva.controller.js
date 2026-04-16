const reservaService = require('../services/reserva.service');
const ApiResponse = require('../utils/ApiResponse');

class ReservaController {
    async getAll(req, res, next) {
        try {
            const reservas = await reservaService.getAllReservas();
            res.status(200).json(ApiResponse.success(reservas));
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const reserva = await reservaService.getReservaById(req.params.id);
            res.status(200).json(ApiResponse.success(reserva));
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const reserva = await reservaService.createReserva(req.body);
            res.status(201).json(ApiResponse.created(reserva));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const reserva = await reservaService.updateReserva(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(reserva, 'Reserva actualizada correctamente'));
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await reservaService.deleteReserva(req.params.id);
            res.status(200).json(ApiResponse.success(null, 'Reserva eliminada correctamente'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ReservaController();