# Use Official Node base image
FROM node:18-alpine as build

# Set directory in container
WORKDIR /app

# copy pakage.json & package-lock.json into container
COPY package*.json ./

# Install packages
RUN npm install

# Copy app directory code to container
COPY . .

# Build the React App for production
RUN npm run build

# Nginx Setup for our react app for 
FROM nginx:1.16.0-alpine

# Copy build folder into Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove old config
RUN rm /etc/nginx/conf.d/default.conf

# Adding new config to serve our our React App
COPY nginx/nginx.conf /etc/nginx/conf.d

# Set container port
EXPOSE 80

# Start NGINX with container RUN
CMD [ "nginx", "-g", "daemon off;" ]