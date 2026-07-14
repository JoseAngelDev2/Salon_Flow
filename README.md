# Salon_Flow

**Salon_Flow** es un sistema de gestión integral para salones de belleza que facilita la administración de citas, clientes, servicios y empleados de manera eficiente y centralizada.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## ✨ Características

- **Gestión de Citas**: Agendar, modificar y cancelar citas
- **Gestión de Clientes**: Registro y perfil de clientes con historial
- **Catálogo de Servicios**: Administración de servicios ofrecidos y precios
- **Gestión de Empleados**: Asignación de empleados a citas
- **Reportes**: Estadísticas de ocupación y ganancias
- **Notificaciones**: Recordatorios de citas (pendiente)
- **Autenticación**: Login seguro para empleados y administradores

## 🛠 Stack Tecnológico

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)

### Frontend (Pendiente)
- **Framework**: React
- **Estilos**: Tailwind CSS
- **Estado**: Redux o Context API

## 📦 Instalación

### Requisitos Previos
- Node.js v18 o superior
- MongoDB instalado y ejecutándose
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/JoseAngelDev2/Salon_Flow.git
cd Salon_Flow
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/salon_flow
JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development
```

4. **Iniciar el servidor**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm run build
npm start
```

### Ejecutar Tests
```bash
npm test
```

## 📁 Estructura del Proyecto

```
Salon_Flow/
├── src/
│   ├── controllers/       # Controladores de rutas
│   ├── models/           # Esquemas de MongoDB
│   ├── routes/           # Definición de rutas API
│   ├── middleware/       # Middleware (autenticación, validación)
│   ├── services/         # Lógica de negocio
│   ├── utils/            # Funciones auxiliares
│   └── app.js            # Configuración principal
├── tests/                # Tests unitarios e integración
├── .env.example          # Ejemplo de variables de entorno
├── package.json          # Dependencias del proyecto
├── README.md             # Documentación (este archivo)
└── server.js             # Punto de entrada
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Clientes
- `GET /api/clientes` - Listar todos los clientes
- `GET /api/clientes/:id` - Obtener cliente específico
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes/:id` - Actualizar cliente
- `DELETE /api/clientes/:id` - Eliminar cliente

### Citas
- `GET /api/citas` - Listar citas
- `GET /api/citas/:id` - Obtener cita específica
- `POST /api/citas` - Crear nueva cita
- `PUT /api/citas/:id` - Actualizar cita
- `DELETE /api/citas/:id` - Cancelar cita

### Servicios
- `GET /api/servicios` - Listar servicios
- `POST /api/servicios` - Crear nuevo servicio
- `PUT /api/servicios/:id` - Actualizar servicio
- `DELETE /api/servicios/:id` - Eliminar servicio

### Empleados
- `GET /api/empleados` - Listar empleados
- `POST /api/empleados` - Agregar empleado
- `PUT /api/empleados/:id` - Actualizar empleado
- `DELETE /api/empleados/:id` - Eliminar empleado

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

**Nota**: Este proyecto está en desarrollo activo. Para reportar bugs o sugerir mejoras, abre un issue.
