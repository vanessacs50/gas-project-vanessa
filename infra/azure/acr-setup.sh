#!/bin/bash
# Script to set up Azure Container Registry (ACR)

RESOURCE_GROUP="gas-project-rg"
ACR_NAME="gasprojectacr"

# Create ACR
az acr create --resource-group $RESOURCE_GROUP --name $ACR_NAME --sku Basic

# Log in to ACR
az acr login --name $ACR_NAME

# Tag and push Docker image
docker tag gas-local $ACR_NAME.azurecr.io/gas:latest
docker push $ACR_NAME.azurecr.io/gas:latest
