
import os
import json
import asyncio
import logging
from typing import Dict, Any
import aiohttp
from signal_bot_client import SignalBot

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SignalMediationBot:
    def __init__(self):
        self.signal_number = os.getenv('SIGNAL_NUMBER', '+16507619680')
        self.webhook_url = os.getenv('WEBHOOK_URL', 'https://cqxqvxfpvcdnympknfql.supabase.co/functions/v1/signal-webhook')
        self.bot = SignalBot(self.signal_number)
        
    async def handle_message(self, message: Dict[str, Any]):
        """Handle incoming Signal messages and send to webhook"""
        try:
            # Extract message data
            payload = {
                'groupId': message.get('groupId'),
                'groupName': message.get('groupName'),
                'senderPhone': message.get('source'),
                'senderName': message.get('sourceName', 'Unknown'),
                'messageText': message.get('message'),
                'timestamp': message.get('timestamp')
            }
            
            logger.info(f"Processing message from {payload['senderName']}: {payload['messageText'][:50]}...")
            
            # Send to PeaceKeeper webhook
            async with aiohttp.ClientSession() as session:
                async with session.post(self.webhook_url, json=payload) as response:
                    result = await response.json()
                    
                    # If mediation was triggered, send response back to Signal
                    if result.get('mediation_triggered') and result.get('response'):
                        await self.send_mediation_response(
                            message.get('groupId'),
                            result['response']
                        )
                        
        except Exception as e:
            logger.error(f"Error handling message: {e}")
    
    async def send_mediation_response(self, group_id: str, response: str):
        """Send mediation response back to Signal group"""
        try:
            await self.bot.send_group_message(group_id, f"🕊️ **PeaceKeeper**: {response}")
            logger.info(f"Sent mediation response to group {group_id}")
        except Exception as e:
            logger.error(f"Error sending mediation response: {e}")
    
    async def start(self):
        """Start the Signal bot"""
        logger.info(f"Starting Signal Mediation Bot for number: {self.signal_number}")
        logger.info(f"Webhook URL: {self.webhook_url}")
        
        # Register message handler
        self.bot.on_message(self.handle_message)
        
        # Start the bot
        await self.bot.start()

async def main():
    """Main function to run the bot"""
    bot = SignalMediationBot()
    
    try:
        await bot.start()
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
    except Exception as e:
        logger.error(f"Bot error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
