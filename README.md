
# Signal Mediation Monorepo

A complete Signal group chat mediation system with AI-powered conflict resolution.

## 🏗️ Project Structure

```
signal-mediation-monorepo/
├── apps/
│   ├── web/           # Lovable React frontend + Supabase functions
│   └── signal-bot/    # Python Signal bot
├── docs/              # Documentation
└── README.md
```

## 🚀 Quick Start

### Frontend (Lovable Web App)
1. The web app is automatically deployed via Lovable
2. Contains the PeaceKeeper dashboard and webhook endpoint
3. Built with React, TypeScript, Tailwind CSS, and Supabase

### Signal Bot (Python)
1. Navigate to `apps/signal-bot/`
2. Copy `.env.example` to `.env` and configure your Signal number
3. Deploy to Render using the provided `render.yaml` configuration

## 🔧 Configuration

### Environment Variables

**Signal Bot (`apps/signal-bot/.env`):**
- `SIGNAL_NUMBER`: Your Signal phone number (e.g., +16507619680)
- `WEBHOOK_URL`: Your Lovable app's webhook URL

### Deployment

**Frontend:**
- Automatically deployed via Lovable
- Webhook URL: `https://your-project-id.supabase.co/functions/v1/signal-webhook`

**Signal Bot:**
- Deploy to Render pointing to `apps/signal-bot/` directory
- Uses the provided `render.yaml` configuration

## 📖 How It Works

1. **Signal Bot** listens to group messages
2. **Webhook** receives message data and analyzes for conflicts using GPT-4
3. **AI Mediation** generates appropriate responses when tension is detected
4. **Response** is sent back to the Signal group via the bot

## 🛠️ Development

### Local Development
```bash
# Frontend
cd apps/web
npm install
npm run dev

# Signal Bot
cd apps/signal-bot
pip install -r requirements.txt
python main.py
```

### Adding Features
- Frontend changes: Use Lovable editor
- Bot changes: Edit files in `apps/signal-bot/`
- Database changes: Use Supabase migrations in `apps/web/supabase/`

## 📚 Documentation

- [Setup Guide](docs/setup-guide.md)
- [Deployment Guide](docs/deployment.md)
- [API Documentation](docs/api.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and bot
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
