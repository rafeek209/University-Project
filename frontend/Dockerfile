# ==========================================
# STAGE 1: Build the React Application
# ==========================================
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend code
COPY . .

# Build the project for production 
# (If using Vite, this creates a 'dist' folder. If Create-React-App, it creates a 'build' folder)
RUN npm run build

# ==========================================
# STAGE 2: Serve the App using Nginx
# ==========================================
FROM nginx:alpine

# Copy the compiled static files from Stage 1 into Nginx
# NOTE: Change '/app/dist' to '/app/build' if you used Create-React-App
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]