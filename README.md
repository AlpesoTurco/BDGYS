# 🎉 Wedding RSVP System - Setup Guide

## 📋 Para que funcione correctamente:

### 1. **Instalar dependencias**
```bash
npm install
```

### 2. **MySQL Setup - IMPORTANTE** 🔴

#### Opción A: Usando MySQL CLI
```bash
# Abre MySQL
mysql -u root -p

# Ejecuta el script SQL
source setup_database.sql;
```

#### Opción B: Usando MySQL Workbench
1. Abre MySQL Workbench
2. Crea una nueva conexión (o usa la existente)
3. Haz click derecho → "Run SQL Script"
4. Selecciona `setup_database.sql`

### 3. **Credenciales de Prueba**

**Login Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

**Códigos de Invitados Disponibles:**
- `ABC123` - Juan Pérez
- `DEF456` - María García
- `GHI789` - Carlos López

### 4. **Iniciar el Servidor**
```bash
cd backend
node server.js
```

Deberías ver:
```
Servidor corriendo en puerto 3000
```

### 5. **Acceder a la Aplicación**

- **Home**: http://localhost:3000
- **Login Admin**: http://localhost:3000/login.html
- **RSVP (Ejemplo)**: http://localhost:3000/rsvp.html?code=ABC123

---

## 🧪 Test del Login

1. Ve a http://localhost:3000/login.html
2. Ingresa:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Deberías ser redirigido a `/admin.html`

---

## 🐛 Si recibes error 401:

**Significa:** Las credenciales son incorrectas o el usuario no existe

**Solución:**
1. Verifica que MySQL esté corriendo
2. Verifica que la base de datos `wedding_db` existe
3. Verifica que la tabla `admins` tenga el usuario
4. Corre: `mysql -u root -p < setup_database.sql`

---

## 🐛 Si recibes error de conexión a BD:

**Comprueba en `.env`:**
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=12345678  # Cambia esto si es diferente
DB_NAME=wedding_db
```

---

## 📁 Estructura del Proyecto

```
wedding/
├── backend/
│   ├── app.js                 # Configuración Express
│   ├── server.js              # Punto de entrada
│   ├── controllers/           # Lógica de negocio
│   ├── models/                # Base de datos
│   ├── routes/                # Rutas API
│   ├── middlewares/           # Autenticación
│   └── utils/                 # Utilidades
├── frontend/
│   ├── views/                 # HTML
│   ├── js/                    # JavaScript
│   └── css/                   # Estilos
├── setup_database.sql         # Script de BD
├── .env                       # Variables de entorno
└── package.json              # Dependencias
```

---

## 🔐 Seguridad

- **Contraseña hasheada** con bcrypt
- **JWT tokens** para autenticación
- **CORS** habilitado (revisar en producción)
- **Variables de entorno** para datos sensibles

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué me pide código en el home?**
R: Los usuarios ingresan su código de invitación para acceder al formulario RSVP.

**P: ¿Cómo genero más invitados?**
R: En el panel admin, después de logearse, puedes crear nuevos invitados.

**P: ¿Los códigos son únicos?**
R: Sí, se generan automáticamente y se valida que no haya duplicados.

**P: ¿Cómo descargo los QR codes?**
R: En el panel admin, junto a cada invitado hay un botón "QR".
