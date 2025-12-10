# imagen oficial de node para consturir la app
FROM node:20-alpine AS build

#directorio dentro del contenedor
WORKDIR /app

# copiamos para instalar dependencias primero 
COPY package*.json ./

# instalar dependencias
RUN npm install

# el primer punto es el contexto (/front) y el segundo es el destino dentro del contenedor(/app)
COPY . .

# construccion de la app
RUN npm run build

# usar la imagen node para produccion
FROM node:20-alpine AS production

# directorio de trabajo
WORKDIR /app

#copiar soolo carpeta generada por el build
COPY --from=build /app/dist ./dist
# copiar carpeta .astro para que el server pueda correr
COPY --from=build /app/.astro ./.astro
# Copia node_modules 
COPY --from=build /app/node_modules ./node_modules
# Copia el package.json 
COPY package.json ./

# exponer el puerto aunque railway lo asigna dinamicamente
EXPOSE 4321 

# comandos de inicio
CMD ["npm", "start"]