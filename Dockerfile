# Usar una imagen base de Node con más recursos (evita problemas de memoria)
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias primero (mejora la caché de Docker)
COPY package*.json ./

# Instalar las dependencias
RUN npm install 

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación para producción con más memoria disponible
# RUN NODE_OPTIONS="--max-old-space-size=1024" npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
