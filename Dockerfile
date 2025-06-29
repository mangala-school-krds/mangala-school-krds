FROM node:18

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install server dependencies
RUN npm install

# Copy backend source
COPY server/ ./server/

# Copy frontend build output
COPY client/build/ ./server/client/build/

WORKDIR /app/server

EXPOSE 5000
CMD ["node", "server.js"]
