# Imagen de node que se va a usar (establecer vuestra versión, en el ejemplo es la 14)
FROM node:14 as builder
# Directorio de trabajo en el contenedor
WORKDIR /app 
# Copiar el archivo package.json y package-lock.json al contenedor para que se puedan instalar las dependencias
COPY package*.json ./ 
# Instalar las dependencias
RUN npm install
# Copiamos todos los ficheros y directorios para el correcto funcionamiento de la aplicación.   
COPY . /app

# Construir la aplicación Angular
RUN npm run build
# Establecer una imagen más liviana arrancar la aplicación Angular
FROM nginx:alpine
# Copiar los archivos compilados al directorio de contenido estático de Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf
# Expone el puerto en el que se ejecutará el frontend
EXPOSE 80
# Define el comando de inicio del contenedor
CMD ["nginx", "-g", "daemon off;"]