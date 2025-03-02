# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode sumber
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Jalankan aplikasi menggunakan mode production
CMD ["npm", "start"]

# Gunakan port 3000
EXPOSE 3000