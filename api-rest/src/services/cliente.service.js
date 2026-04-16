const clienteRepository = require('../repositories/cliente.repository');
const { ERROR_MESSAGES } = require('../utils/constants');

class ClienteService {
    async getAllClientes() {
        return await clienteRepository.findAll();
    }

    async getClienteById(id) {
        const cliente = await clienteRepository.findById(id);
        if (!cliente) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        return cliente;
    }

    async createCliente(data) {
        const { nombre, email, telefono } = data;
        
        if (!nombre || !email) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        const existingCliente = await clienteRepository.findByEmail(email);
        if (existingCliente) {
            const error = new Error('El email ya existe');
            error.code = 'ER_DUP_ENTRY';
            throw error;
        }

        return await clienteRepository.create({ nombre, email, telefono });
    }

    async updateCliente(id, data) {
        const { nombre, email, telefono } = data;
        
        if (!nombre || !email) {
            throw new Error(ERROR_MESSAGES.REQUIRED_FIELD);
        }

        const existingCliente = await clienteRepository.findById(id);
        if (!existingCliente) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }

        const existingEmail = await clienteRepository.findByEmail(email);
        if (existingEmail && existingEmail.id !== id) {
            const error = new Error('El email ya existe');
            error.code = 'ER_DUP_ENTRY';
            throw error;
        }

        const updated = await clienteRepository.update(id, { nombre, email, telefono });
        if (!updated) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return { id, nombre, email, telefono };
    }

    async deleteCliente(id) {
        const existingCliente = await clienteRepository.findById(id);
        if (!existingCliente) {
            throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        
        return await clienteRepository.delete(id);
    }
}

module.exports = new ClienteService();