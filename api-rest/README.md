# API REST - Gestión de Reservas de Hotel

## Descripción
API REST para gestionar Hoteles, Clientes y Reservas de una cadena hotelera.

## Requisitos
- Node.js v18+
- Docker

## Instalación

### 1. Clonar e instalar dependencias
```bash
npm install
```

### 2. Configurar Base de Datos

**Docker Compose**
```bash
docker-compose up -d
```
Esto inicia MySQL con la base de datos `hotel_reservas` y las tablas necesarias.

### 3. Configurar variables de entorno

1. Copia el archivo de ejemplo:
```bash
   cp .env.example .env
```

Editar el archivo `.env` y configurar los valores

```
# Configuración de la base de datos
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=espe123
DB_NAME=hotel_reservas
```

## Ejecutar la API

**Desarrollo (con nodemon):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

La API estará disponible en: `http://localhost:3000`

## Endpoints

### Hoteles
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/hoteles` | Listar todos los hoteles |
| GET | `/api/hoteles/:id` | Obtener hotel por ID |
| POST | `/api/hoteles` | Crear hotel |
| PUT | `/api/hoteles/:id` | Actualizar hotel |
| DELETE | `/api/hoteles/:id` | Eliminar hotel |


### Clientes
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Listar todos los clientes |
| GET | `/api/clientes/:id` | Obtener cliente por ID |
| POST | `/api/clientes` | Crear cliente |
| PUT | `/api/clientes/:id` | Actualizar cliente |
| DELETE | `/api/clientes/:id` | Eliminar cliente |


### Reservas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reservas` | Listar todas las reservas |
| GET | `/api/reservas/:id` | Obtener reserva por ID |
| POST | `/api/reservas` | Crear reserva |
| PUT | `/api/reservas/:id` | Actualizar reserva |
| DELETE | `/api/reservas/:id` | Eliminar reserva |


## Probar con Postman
Importar `hotel_reservas_api.postman_collection.json` en Postman.

## Códigos de Estado HTTP
- `200` - Petición exitosa (GET/PUT)
- `201` - Recurso creado (POST)
- `400` - Solicitud inválida
- `404` - Recurso no encontrado
- `500` - Error del servidor
- `503` - Base de Datos no disponible
