# Usar la imagen oficial de Node como base
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero (mejora la caché de Docker)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Instalar un servidor web ligero para servir la aplicación (opcional, si usas Vite o CRA puedes usar `serve`)
RUN npm install -g serve

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["serve", "-s", "build", "-l", "3000"]