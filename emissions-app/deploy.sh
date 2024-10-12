#!/bin/bash
export APP_NAME="emissions-app"
export PROJECT_ID="marino-emissions-app"
export REGION="europe-west1"
export DOCKER_REGISTRY="$REGION-docker.pkg.dev"
export DOCKER_REGISTRY_NAME="marino-app"
export DATE_TIME_SECONDS_REVISION=$(date +%s)
export DOCKER_IMAGE_PATH="$DOCKER_REGISTRY/$PROJECT_ID/$DOCKER_REGISTRY_NAME/$APP_NAME:$DATE_TIME_SECONDS_REVISION"

echo "Building app"
docker build -t $APP_NAME .

echo "Tagging app"
docker tag $APP_NAME $DOCKER_IMAGE_PATH

echo "Checking if docker is configured to connect to GCP Artifact Registry"
if ! grep -q "$DOCKER_REGISTRY" ~/.docker/config.json; then
    echo "Configuring Docker to use gcloud credentials..."
    gcloud auth configure-docker $DOCKER_REGISTRY
else
    echo "Docker is already configured for $DOCKER_REGISTRY"
fi

echo "Pushing docker image to docker registry in GCP"
docker push $DOCKER_IMAGE_PATH

echo "Depoying docker image to GCP Cloud Run"
gcloud run deploy $APP_NAME \
  --image $DOCKER_IMAGE_PATH \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --memory "512Mi" \
  --cpu "1"