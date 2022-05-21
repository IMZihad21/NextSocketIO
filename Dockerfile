# Import node alpine base
FROM node:lts-alpine

# Meta data
LABEL maintainer="ZèD <imzihad@gmail.com>"

# Add required dependency
#RUN apk add --no-cache libc6-compat

# Set workdir
WORKDIR /app

# Setup runner user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S runner -u 1001
RUN chown -R runner:nodejs /app
USER runner

# Install Node App Dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# Env setup
ENV NODE_ENV production
ENV PORT 3000

# Port Expose
EXPOSE 3000

# Copy Source
COPY . .

# Build App
RUN yarn build

# Start App on entry
CMD ["yarn", "start"]
