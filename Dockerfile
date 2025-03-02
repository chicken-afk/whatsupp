# Gunakan image Node.js versi terbaru
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Jalankan aplikasi dalam mode production
CMD ["npm", "run", "start"]

# Gunakan port 3000
EXPOSE 3000
