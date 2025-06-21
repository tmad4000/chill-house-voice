
# Signal CLI REST API Server

This service provides a REST API interface for Signal messaging using signal-cli.

## Deployment

This service is designed to be deployed on Render as a Docker container.

### Steps:

1. Deploy this service to Render using the render.yaml configuration
2. Wait for the service to start (it may take a few minutes)
3. Register your Signal number with the API
4. Update your Python bot's SIGNAL_API_URL to point to this service

### Registration Commands

Once deployed, register your Signal number:

```bash
# Replace YOUR_RENDER_URL with your actual Render service URL
export SIGNAL_API_URL="https://your-signal-api-service.onrender.com"

# Register the number
curl -X POST "${SIGNAL_API_URL}/v1/register/+16507619680"

# Verify with SMS code (replace SMS_CODE with the actual code)
curl -X POST "${SIGNAL_API_URL}/v1/register/+16507619680/verify/SMS_CODE"
```

### Health Check

Check if the service is running:
```bash
curl https://your-signal-api-service.onrender.com/v1/about
```

### Test Messaging

Send a test message:
```bash
curl -X POST "${SIGNAL_API_URL}/v1/send" \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Hello from Signal bot!",
    "number": "+16507619680",
    "recipients": ["+RECIPIENT_NUMBER"]
  }'
```

## Configuration

The service uses persistent disk storage to maintain Signal registration data across deployments.

## Troubleshooting

- If registration fails, ensure the phone number is valid and can receive SMS
- Check the Render logs for any Java or signal-cli errors
- The service may take 2-3 minutes to fully start up
