# Utilisez l'image officielle Node.js en tant qu'image de base
FROM node:14

# Copiez les fichiers de l'application dans le conteneur
COPY . /app

# Définissez le répertoire de travail de l'application
WORKDIR /app

# Installez les dépendances de l'application
RUN npm install

# Exposez le port sur lequel l'application écoute
EXPOSE 4000

# Démarrez l'application
CMD ["node", "server.js"]