# # Stage 1: Build React app
# FROM node:18 AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve using nginx
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Use nginx only – no build step
FROM nginx:alpine

# Copy the prebuilt React app
COPY ./build /usr/share/nginx/html

# Optional: custom nginx config (if needed)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
