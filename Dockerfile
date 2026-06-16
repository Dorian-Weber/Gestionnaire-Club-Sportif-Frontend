# Stage 1 — builder
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npx ng build --configuration production

# Stage 2 — runtime nginx
FROM nginx:stable
# Supprime la config par défaut si tu veux remplacer complètement
RUN rm -f /etc/nginx/conf.d/default.conf
# Copie la config nginx fournie (voir nginx.conf ci‑dessous)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le contenu du build Angular (dossier browser) vers la racine nginx
COPY --from=builder /app/dist/Gest-Club-Sport-Frontend/browser /usr/share/nginx/html

# Exposer le port (documentaire, docker run -p gère le mapping)
EXPOSE 80

# Commande par défaut (déjà définie dans l'image nginx)
CMD ["nginx", "-g", "daemon off;"]
