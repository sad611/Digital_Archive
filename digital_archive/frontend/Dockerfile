FROM node:18-alpine

# Install tini
RUN apk add --no-cache tini

WORKDIR /app
COPY package*.json ./
ENV REACT_APP_API_URL=http://localhost:3000
RUN npm install
# Don't COPY here; we'll bind-mount in compose
EXPOSE 5173

# Use tini as the entrypoint, passing signals through
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
