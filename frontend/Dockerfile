# Use uma imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho
WORKDIR /frontend/app

# Copie os arquivos do frontend
COPY package*.json ./
RUN npm install
COPY . .

# Construir o frontend para produção
RUN npm run build

# Exponha a porta usada pelo servidor de desenvolvimento (se necessário)
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
