#!/bin/bash
ENV_NAME=$(grep '^name:' environment.yaml | sed 's/name:[[:space:]]*//')

# Check if the Conda environment exists
if conda info --envs | grep -q $ENV_NAME; then
    echo "Updating existing Conda environment '$ENV_NAME'..."
    conda env update -n $ENV_NAME -f environment.yaml --prune
else
    echo "Creating Conda environment from environment.yaml..."
    conda env create -f environment.yaml
fi

# Activate the environment
echo "Activating Conda environment '$ENV_NAME'..."
conda activate $ENV_NAME

# Change directory to environment
cd $ENV_NAME

# Start the Docker containers
echo "Starting Docker containers..."
docker-compose up
