# Use official Node.js image as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Ensure the publications.json file is copied
COPY publications.json ./publications.json

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]