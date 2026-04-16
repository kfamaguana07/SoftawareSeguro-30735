class ApiResponse {
    static success(data, message = 'Success', statusCode = 200) {
        return {
            success: true,
            message,
            data,
            statusCode
        };
    }

    static created(data, message = 'Resource created successfully', statusCode = 201) {
        return {
            success: true,
            message,
            data,
            statusCode
        };
    }

    static error(message = 'An error occurred', statusCode = 500, errors = null) {
        return {
            success: false,
            message,
            errors,
            statusCode
        };
    }

    static notFound(message = 'Resource not found') {
        return this.error(message, 404);
    }

    static badRequest(message = 'Bad request') {
        return this.error(message, 400);
    }

    static unauthorized(message = 'Unauthorized') {
        return this.error(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return this.error(message, 403);
    }
}

module.exports = ApiResponse;