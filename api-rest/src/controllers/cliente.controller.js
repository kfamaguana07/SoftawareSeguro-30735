const clienteService = require('../services/cliente.service');
const ApiResponse = require('../utils/ApiResponse');

class ClienteController {
    async getAll(req, res, next) {
        try {
            const clientes = await clienteService.getAllClientes();
            res.status(200).json(ApiResponse.success(clientes));
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const cliente = await clienteService.getClienteById(req.params.id);
            res.status(200).json(ApiResponse.success(cliente));
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const cliente = await clienteService.createCliente(req.body);
            res.status(201).json(ApiResponse.created(cliente));
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const cliente = await clienteService.updateCliente(req.params.id, req.body);
            res.status(200).json(ApiResponse.success(cliente, 'Cliente actualizado correctamente'));
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await clienteService.deleteCliente(req.params.id);
            res.status(200).json(ApiResponse.success(null, 'Cliente eliminado correctamente'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ClienteController();