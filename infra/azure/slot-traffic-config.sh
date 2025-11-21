#!/bin/bash
# Script to configure slot traffic for Blue-Green deployment

APP_NAME="gas-project-vanessa"
RESOURCE_GROUP="gas-project-rg"

# Create deployment slots
az webapp deployment slot create --name $APP_NAME --resource-group $RESOURCE_GROUP --slot blue
az webapp deployment slot create --name $APP_NAME --resource-group $RESOURCE_GROUP --slot green

# Route 100% traffic to blue initially
az webapp traffic-routing set --name $APP_NAME --resource-group $RESOURCE_GROUP --distribution blue=100 green=0

# Example: route 10% traffic to green (canary)
az webapp traffic-routing set --name $APP_NAME --resource-group $RESOURCE_GROUP --distribution blue=90 green=10
