# 1. Use a lightweight version of Node.js
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the package files first (This makes building faster)
COPY package*.json ./

# 4. Install backend dependencies
RUN npm install

# 5. Copy the rest of your backend source code
COPY . .

# 6. Expose the port your API runs on (Change if your app uses a different port)
EXPOSE 5000

# 7. The command to start your backend
CMD ["npm", "start"]