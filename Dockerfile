# Stage 1: Build the React frontend
FROM node:20-alpine as frontend-build

WORKDIR /app/frontend

# Install dependencies based on the lock file (for better caching)
COPY emissions_app/frontend/package*.json ./
RUN npm install --silent

# Copy the rest of the React app and build it
COPY emissions_app/frontend/ ./
RUN npm run build

# Stage 2: Build the Flask backend (Python 3.12)
FROM python:3.12-slim as backend

WORKDIR /app

# Install Python dependencies first for better caching
COPY emissions_app/backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app code
COPY emissions_app/backend/ .

# Copy React build from frontend-build stage to Flask's static folder
COPY --from=frontend-build /app/frontend/build /app/static

# Expose Flask port (5000)
EXPOSE 5000

# Use Gunicorn as the WSGI server for production
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
