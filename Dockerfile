# Stage 1 — builder
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npx ng build --configuration production

# Stage 2 — runtime nginx
FROM nginx:stable
# Remplacer la config nginx embarquée par celle du repo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le contenu du build Angular (dossier browser) vers la racine nginx
COPY --from=builder /app/dist/Gest-Club-Sport-Frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
