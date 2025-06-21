
# Deployment Guide

## Overview

This monorepo contains two main components:
1. **Frontend**: Deployed via Lovable (automatic)
2. **Signal Bot**: Deployed to Render (manual setup)

## Frontend Deployment (Lovable)

### Automatic Deployment
- Your Lovable app is automatically deployed
- Webhook endpoint: `https://your-project-id.supabase.co/functions/v1/signal-webhook`
- No additional configuration needed

### Custom Domain (Optional)
1. Go to Project Settings in Lovable
2. Add your custom domain
3. Update webhook URL in bot configuration

## Signal Bot Deployment (Render)

### 1. Repository Setup
```bash
# Clone your monorepo
git clone https://github.com/yourusername/signal-mediation-monorepo.git
cd signal-mediation-monorepo
```

### 2. Render Configuration

**Create new Web Service:**
- Repository: Your GitHub repo
- Root Directory: `apps/signal-bot`
- Build Command: `pip install -r requirements.txt`
- Start Command: `python main.py`

**Environment Variables:**
```
SIGNAL_NUMBER=+16507619680
WEBHOOK_URL=https://your-project-id.supabase.co/functions/v1/signal-webhook
DEBUG=false
```

### 3. Alternative: Using render.yaml

Deploy using the provided configuration:

```yaml
# render.yaml (in root)
services:
  - type: web
    name: signal-mediation-bot
    env: python
    rootDir: apps/signal-bot
    buildCommand: pip install -r requirements.txt
    startCommand: python main.py
    envVars:
      - key: SIGNAL_NUMBER
        value: +16507619680
      - key: WEBHOOK_URL
        sync: false
```

## Database (Supabase)

### Automatic Setup
- Database migrations are automatically applied
- Edge functions are automatically deployed
- No manual configuration needed

### Manual Verification
1. Check Supabase dashboard
2. Verify tables are created:
   - `signal_conversations`
   - `signal_messages`
   - `mediation_events`
3. Confirm edge function is deployed

## Production Checklist

### Before Going Live
- [ ] Signal bot is registered and verified
- [ ] Render service is deployed and running
- [ ] Webhook URL is accessible
- [ ] OpenAI API key is configured
- [ ] Test message flow end-to-end
- [ ] Monitor logs for errors

### Monitoring
- **Render**: Service logs and metrics
- **Supabase**: Function logs and database activity
- **Signal**: Message delivery and bot responses

### Scaling Considerations
- **Bot**: Render automatically scales based on traffic
- **Database**: Supabase handles scaling automatically
- **API**: OpenAI has rate limits - monitor usage

## Troubleshooting Deployment

### Common Issues
1. **Bot not starting**: Check Python dependencies
2. **Webhook unreachable**: Verify URL and CORS settings
3. **Database errors**: Check Supabase connection
4. **Signal auth**: Re-register bot if needed

### Health Checks
```bash
# Check bot health
curl https://your-render-app.onrender.com/health

# Test webhook
curl -X POST https://your-project-id.supabase.co/functions/v1/signal-webhook \
  -H "Content-Type: application/json" \
  -d '{"groupId":"test","messageText":"hello world"}'
```

## Rollback Procedures

### Frontend
- Use Lovable's built-in version history
- Revert to previous deployment

### Signal Bot
- Deploy previous Git commit via Render
- Or rollback via Render dashboard

### Database
- Use Supabase migration rollback
- Restore from backup if needed
