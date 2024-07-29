# Use the official Node.js 20.x LTS image
FROM node:20
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./
# Install npm dependencies
RUN npm install -g npm@10.5.0
# Copy the rest of the application code
COPY . .
# Expose the port the app runs on
EXPOSE 8088
# Start the application
CMD ["npm", "start"]
