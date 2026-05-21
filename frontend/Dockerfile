FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Utiliser npm install au lieu de npm ci (car package-lock.json peut être absent)
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ecommerce-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
