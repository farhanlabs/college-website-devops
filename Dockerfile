# === STAGE 1: React App ko Build Karna ===
FROM node:20-alpine AS build
WORKDIR /app

# Pehle package files copy karke dependencies install karenge (Caching ke liye)
COPY package*.json ./
RUN npm install

# Pura code copy karke production build (dist folder) banayenge
COPY . .
RUN npm run build

# === STAGE 2: Sirf Build Files ko Serve Karna ===
FROM nginx:alpine

# Vite ka final output 'dist' folder me banta hai.
# Hum Stage 1 se 'dist' folder utha kar Nginx ke public folder me daal rahe hain.
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx default port 80 par chalta hai
EXPOSE 80

# Nginx server ko foreground me chalane ke liye
CMD ["nginx", "-g", "daemon off;"]