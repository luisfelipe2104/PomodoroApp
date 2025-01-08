# Use uma imagem base do Node.js
FROM node:18 AS base

# Atualizar e instalar dependências básicas para garantir que as instalações funcionem
# RUN apt-get update && apt-get install -y \
#   curl \
#   gnupg2 \
#   lsb-release \
#   ca-certificates \
#   openjdk-11-jdk \
#   && apt-get clean

# Instale Yarn (o Yarn precisa do repositório oficial para instalar corretamente)
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | tee /etc/apt/trusted.gpg.d/yarn.asc
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Instale o EAS CLI
RUN npm install -g eas-cli

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante do código do projeto
COPY . .

# Configure o build do EAS
RUN eas build:configure

# Comando para compilar o APK com EAS
CMD ["eas", "build", "--platform", "android", "--profile", "release"]



# sudo docker build -t pomodoroapp .
# sudo docker run -p 3000:5000 pomodoroapp