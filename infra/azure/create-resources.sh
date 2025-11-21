#!/bin/bash
# Script to create Azure resources for GAS Project

RESOURCE_GROUP="gas-project-rg"
APP_SERVICE_PLAN="gas-project-plan"
APP_NAME="gas-project-vanessa"

# Create resource group
az group create --name $RESOURCE_GROUP --location "westeurope"

# Create App Service plan
az appservice plan create --name $APP_SERVICE_PLAN --resource-group $RESOURCE_GROUP --sku S1 --is-linux

# Create Web App
az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --runtime "NODE|22-lts"
