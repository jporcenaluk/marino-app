#!/bin/bash
docker run -v /path/to/my-gcp-key.json:/app/my-gcp-key.json -e GOOGLE_APPLICATION_CREDENTIALS="/app/my-gcp-key.json" my-backend-image
