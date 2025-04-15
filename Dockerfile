# Etapa 1: build da aplicação
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta (caso deseje definir uma)
EXPOSE 5000

# Comando padrão para subir a API
CMD ["node", "index.js"]
