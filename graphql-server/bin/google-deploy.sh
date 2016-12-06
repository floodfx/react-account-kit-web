#!/bin/bash

GCLOUD_CONFIGURATION=$1

if [ -z "$GCLOUD_CONFIGURATION"]; then
  echo "Expecting a Google Cloud Configuration"
  exit 1
fi

# ensure gma-village gcloud configuration activated
gcloud config configurations activate $GCLOUD_CONFIGURATION

# deploy
gcloud app deploy google/app.yaml
