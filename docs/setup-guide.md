
# Setup Guide

## Prerequisites

- Signal account with a phone number
- Render account (for bot deployment)
- OpenAI API key (already configured in Supabase)

## Step-by-Step Setup

### 1. Signal Bot Setup

#### Option A: Using signal-cli (Recommended)
```bash
# Install signal-cli
brew install signal-cli  # macOS
# or download from: https://github.com/AsamK/signal-cli

# Register your number
signal-cli -u +YOUR_NUMBER register

# Verify with SMS code
signal-cli -u +YOUR_NUMBER verify CODE_FROM_SMS
```

#### Option B: Using Signal API Service
- Use a service like Signal API Server
- Configure webhook endpoints

### 2. Deploy Signal Bot to Render

1. **Fork/Clone this repository**
2. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account
   - Create new Web Service
   - Point to your repository
   - Set Root Directory: `apps/signal-bot`

3. **Configure Environment Variables:**
   ```
   SIGNAL_NUMBER=+16507619680
   WEBHOOK_URL=https://your-project-id.supabase.co/functions/v1/signal-webhook
   ```

### 3. Test the Integration

1. **Add bot to Signal group**
2. **Send test messages** to trigger conflicts
3. **Check Render logs** for bot activity
4. **Monitor Supabase** function logs for webhook calls

### 4. Customize Mediation

Edit the GPT-4 prompt in `apps/web/supabase/functions/signal-webhook/index.ts`:

```typescript
const prompt = `You are PeaceKeeper, an AI mediator for Signal group chats...`;
```

## Troubleshooting

### Common Issues

**Bot not receiving messages:**
- Check Signal registration
- Verify webhook URL is accessible
- Check Render deployment logs

**Webhook not responding:**
- Verify Supabase function is deployed
- Check OpenAI API key is set
- Monitor function logs in Supabase dashboard

**Messages not being sent:**
- Check Signal bot permissions
- Verify group membership
- Check Render service logs

### Debug Commands

```bash
# Test webhook locally
curl -X POST your-webhook-url \
  -H "Content-Type: application/json" \
  -d '{"groupId":"test","messageText":"test conflict message"}'

# Check Signal bot status
signal-cli -u +YOUR_NUMBER listGroups

# View Render logs
# Go to Render dashboard > Your Service > Logs
```

## Next Steps

- [Deployment Guide](deployment.md)
- [API Documentation](api.md)
- [Customization Guide](customization.md)
