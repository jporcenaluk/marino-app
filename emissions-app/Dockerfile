# Stage 1: Build the React frontend
FROM node:20-alpine as frontend-build

WORKDIR /app/frontend

# Install dependencies based on the lock file (for better caching)
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --silent

# Copy the rest of the React app and build it
COPY frontend/ ./
RUN yarn run build

# Stage 2: Build the Flask backend (Python 3.12)
FROM python:3.12-slim as backend

WORKDIR /app

# Install Python dependencies first for better caching
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app code
COPY backend/src/ .

# Copy React build from frontend-build stage to Flask's static folder
COPY --from=frontend-build /app/frontend/dist /app/static

EXPOSE 8080

# Use Gunicorn as the WSGI server for production
# Port 8080 is set by default, overridden by $PORT if available
CMD gunicorn -b 0.0.0.0:${PORT:-8080} app:app
