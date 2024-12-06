# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
ENTRYPOINT ["npm", "start"]