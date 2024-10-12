#!/bin/bash
echo "building app"
export APP_NAME="emissions-app"
export PROJECT_ID="marino-emissions-app"
export REGION="europe-west1"
export DOCKER_REGISTRY="$REGION-docker.pkg.dev"
export DOCKER_REGISTRY_NAME="marino-app"
export DATE_TIME_SECONDS_REVISION=$(date +%s)
export DOCKER_IMAGE_PATH="$DOCKER_REGISTRY/$PROJECT_ID/$DOCKER_REGISTRY_NAME/$APP_NAME:$DATE_TIME_SECONDS_REVISION"

echo "Building app"
docker build -t $APP_NAME .

echo "running app"
docker run -e GOOGLE_APPLICATION_CREDENTIALS=/tmp/keys/marino-emissions-app-ddd3dd1803cb.json -v $GOOGLE_APPLICATION_CREDENTIALS:/tmp/keys/marino-emissions-app-ddd3dd1803cb.json:ro -p 8080:8080 $APP_NAME