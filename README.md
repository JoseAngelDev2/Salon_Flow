# Salon_Flow 💇‍♀️

**Salon_Flow** es una aplicación de gestión de clientes para salones de belleza. Consta de una **API REST en C# con .NET** y un **frontend con HTML, CSS y JavaScript puro**, permitiendo administrar clientes de forma eficiente.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Cómo Ejecutar](#cómo-ejecutar)
- [API Endpoints](#api-endpoints)
- [Consumir la API desde Frontend](#consumir-la-api-desde-frontend)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## ✨ Características

✅ **Gestión de Clientes**
- Crear, leer, actualizar y eliminar clientes
- Búsqueda de clientes por nombre o teléfono
- Estado de activo/inactivo

✅ **Dashboard**
- Estadísticas en tiempo real (total de usuarios, activos e inactivos)
- Interfaz moderna con diseño skeuomorphic

✅ **Validación Robusta**
- Validación en backend con FluentValidations
- Validación en frontend con JavaScript
- Manejo de errores detallado

✅ **Documentación Automática**
- Swagger UI integrado para explorar endpoints

---

## 🛠 Stack Tecnológico

### Backend
- **Lenguaje**: C# 12
- **Framework**: .NET 8 (ASP.NET Core)
- **Base de Datos**: PostgreSQL (via EntityFrameworkCore)
- **ORM**: Entity Framework Core (EF Core)
- **Validación**: FluentValidations
- **Documentación API**: Swagger (OpenAPI)
- **CORS**: Habilitado para consumo desde frontend

### Frontend
- **Lenguaje**: HTML5, CSS3, JavaScript (ES6+)
- **Arquitectura**: Vanilla JavaScript (sin frameworks)
- **Estilos**: CSS puro con variables CSS y diseño responsive
- **Diseño**: Skeuomorphic moderno
- **Patrón**: Modular con separación de responsabilidades (api.js, ui.js, customers.js)

---

## 📁 Estructura del Proyecto

```
SalonFlow/
├── src/
│   ├── Program.cs                    # Configuración principal de la aplicación
│   ├── Controllers/
│   │   └── CustomerController.cs     # Endpoints para clientes (CRUD)
│   ├── Models/
│   │   └── Customer.cs               # Entidad Customer (Nombre, Email, Teléfono, etc.)
│   ├── Data/
│   │   └── CustomerDbContext.cs      # Context de Entity Framework
│   ├── DTOs/
│   │   ├── CreateCustomerDTOs.cs     # DTO para crear/actualizar clientes
│   │   └── ReadCustomerDTOs.cs       # DTO para lectura de clientes
│   ├── FluentValidation/
│   │   └── CreateCustomerDTOsValidator.cs  # Reglas de validación
│   └── salonflow-frontend/
│       ├── index.html                # Interfaz principal
│       ├── css/
│       │   └── style.css             # Estilos (diseño skeuomorphic)
│       └── js/
│           ├── api.js                # Cliente HTTP para consumir API
│           ├── ui.js                 # Manejo del DOM y UI
│           ├── customers.js          # Lógica de negocio de clientes
│           └── main.js               # Inicialización y event listeners
├── appsettings.json                  # Configuración (conexión BD, etc.)
└── SalonFlow.csproj                  # Proyecto C#
```

### Cómo funciona:

1. **Backend (C#)**: Recibe peticiones HTTP en los endpoints `/api/customer`
2. **Validación**: FluentValidations valida los datos antes de guardar
3. **Base de Datos**: Entity Framework persiste los datos en PostgreSQL
4. **Frontend (JS)**: Consume la API con `fetch()` y renderiza la UI dinámicamente
5. **CORS**: Permite comunicación entre frontend (localhost:puerto) y backend (localhost:5244)

---

## 📦 Instalación y Configuración

### Requisitos Previos

- **.NET 8 SDK** o superior
- **PostgreSQL** instalado y ejecutándose
- **Visual Studio**, **Visual Studio Code** o editor C# compatible
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

### Pasos

#### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseAngelDev2/Salon_Flow.git
cd Salon_Flow
git checkout develop
```

#### 2. Configurar la conexión a Base de Datos

Edita el archivo `SalonFlow/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=salon_flow;Username=postgres;Password=tu_password"
  }
}
```

Asegúrate de que PostgreSQL esté corriendo y la base de datos `salon_flow` existe.

#### 3. Restaurar paquetes NuGet

```bash
cd SalonFlow
dotnet restore
```

#### 4. Aplicar migraciones (crear tabla Customers)

```bash
dotnet ef database update
```

Si no tienes EF CLI instalado:

```bash
dotnet tool install --global dotnet-ef
```

#### 5. Compilar el proyecto

```bash
dotnet build
```

---

## 🚀 Cómo Ejecutar

### Backend

```bash
cd SalonFlow
dotnet run
```

La API estará disponible en: **http://localhost:5244**

Swagger UI: **http://localhost:5244/swagger**

### Frontend

El frontend está en `SalonFlow/src/salonflow-frontend/`. Abre en tu navegador:

```bash
# Opción 1: Abrir directamente desde el navegador
open SalonFlow/src/salonflow-frontend/index.html
# O desde terminal en Windows:
start SalonFlow\src\salonflow-frontend\index.html
```

O usa un servidor local:

```bash
# Opción 2: Con Python
cd SalonFlow/src/salonflow-frontend
python -m http.server 8000
# Luego accede a http://localhost:8000

# Opción 3: Con Node.js + http-server
npm install -g http-server
http-server SalonFlow/src/salonflow-frontend
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5244/api
```

### Customers (Clientes)

#### Obtener todos los clientes
```http
GET /api/Customer
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "Juan",
    "lastname": "Pérez",
    "email": "juan@example.com",
    "phone": "555-1234",
    "active": 1
  }
]
```

---

#### Crear un cliente
```http
POST /api/Customer
Content-Type: application/json

{
  "name": "María",
  "lastname": "García",
  "email": "maria@example.com",
  "phone": "555-5678",
  "active": 1
}
```

**Response** (204 No Content)

**Validaciones** (FluentValidations):
- `name`: Requerido, máximo 25 caracteres
- `lastname`: Requerido, máximo 25 caracteres
- `email`: Requerido, máximo 40 caracteres, formato válido de email
- `phone`: Máximo 15 caracteres
- `active`: Requerido, 0 o 1

---

#### Actualizar un cliente
```http
PUT /api/Customer/{id}
Content-Type: application/json

{
  "id": 1,
  "name": "Juan Carlos",
  "lastname": "Pérez López",
  "email": "juancarlos@example.com",
  "phone": "555-9999",
  "active": 1
}
```

**Response** (204 No Content)

---

#### Eliminar un cliente
```http
DELETE /api/Customer/{id}
```

**Response** (204 No Content)

---

## 💻 Consumir la API desde Frontend

### Archivo: `js/api.js`

```javascript
const API_BASE_URL = "http://localhost:5244/api/Customer";

// Obtener todos los clientes
await CustomerApi.getAll();

// Crear un cliente
await CustomerApi.create({
  name: "Pedro",
  lastname: "López",
  email: "pedro@example.com",
  phone: "555-0000",
  active: 1
});

// Actualizar un cliente
await CustomerApi.update(1, {
  id: 1,
  name: "Pedro Actualizado",
  lastname: "López",
  email: "pedro@example.com",
  phone: "555-0000",
  active: 1
});

// Eliminar un cliente
await CustomerApi.remove(1);
```

### Ejemplo de uso en JavaScript Vanilla

```javascript
// Función para cargar clientes
async function loadCustomers() {
  try {
    const customers = await CustomerApi.getAll();
    console.log(customers);
    // Renderizar en el DOM
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Función para crear cliente
async function addCustomer(formData) {
  try {
    await CustomerApi.create(formData);
    console.log("Cliente creado exitosamente");
  } catch (error) {
    console.error("Error al crear:", error);
  }
}
```

---

## 🔍 Validaciones

### Backend (FluentValidations)

En `src/FluentValidation/CreateCustomerDTOsValidator.cs`:

```csharp
public class CreateCustomerDTOsValidator : AbstractValidator<CreateCustomerDTOs>
{
    public CreateCustomerDTOsValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(25).WithMessage("Máximo 25 caracteres");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El email es obligatorio")
            .EmailAddress().WithMessage("Email inválido");

        // Más reglas...
    }
}
```

### Frontend (JavaScript)

En `js/customers.js`:

```javascript
validate({ name, lastname, email, phone, active }) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Ingresa un email válido.";
  }

  return errors;
}
```

---

## 📊 Uso de la Aplicación

### Dashboard
- Accede a la sección **Dashboard** para ver estadísticas en tiempo real
- Muestra: Total de usuarios, activos e inactivos

### Customers (Clientes)
1. Haz clic en **Customers** en la barra lateral
2. **Ver clientes**: Se cargan automáticamente desde la API
3. **Agregar cliente**: Haz clic en el botón "Add Customer" y completa el formulario
4. **Buscar**: Usa la barra de búsqueda para filtrar por nombre o teléfono
5. **Editar**: Haz clic en el icono de edición (lápiz) para modificar un cliente
6. **Eliminar**: Haz clic en el icono de papelera para eliminar un cliente

---

## 🔧 Tecnologías Adicionales Utilizadas

- **EntityFramework Core**: ORM para mapeo objeto-relacional
- **FluentValidation**: Validación declarativa de datos
- **Swagger/Swashbuckle**: Documentación automática de API REST
- **CORS Middleware**: Manejo de solicitudes entre orígenes
- **PostgreSQL**: Sistema de gestión de base de datos relacional

---

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/NuevaFuncionalidad`
3. Realiza tus cambios y haz commits: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a tu rama: `git push origin feature/NuevaFuncionalidad`
5. Abre un Pull Request describiendo los cambios

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📞 Soporte y Contacto

- **GitHub**: [JoseAngelDev2](https://github.com/JoseAngelDev2)
- **Issues**: Abre un issue en el repositorio si encuentras algún problema
- **Documentación Swagger**: Disponible en `http://localhost:5244/swagger`

---

**Nota**: Este proyecto está en desarrollo activo. Para reportar bugs o sugerir mejoras, por favor abre un issue.
