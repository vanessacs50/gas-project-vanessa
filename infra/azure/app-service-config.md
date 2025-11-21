# Azure App Service Config
# Azure App Service Configuration

This document describes how the GAS Project would be deployed to Azure App Service.

## Settings
- Runtime: Node.js 22 LTS
- Region: West Europe (example)
- Plan: Standard S1
- Environment Variables:
  - `NODE_ENV=production`
  - `VERSION=production`

## Deployment Slots
- **Blue slot** → current production
- **Green slot** → new version for testing
- Swap slots after validation.

