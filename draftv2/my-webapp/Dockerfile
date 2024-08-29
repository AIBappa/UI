# Use the official Node.js image as the base for the build stage
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build  # This runs `npx next build` internally

# Use the official Node.js image as the base for the production stage
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app .

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npx", "next", "start"]



