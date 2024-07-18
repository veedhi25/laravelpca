# Specify a base image
FROM node:16.16.0

# Specify a working directory in the image
WORKDIR /usr/src/app

# Copy package.json, yarn.lock file to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Specify the command to run
CMD ["yarn", "start"]
