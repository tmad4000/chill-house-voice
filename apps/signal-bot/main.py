
import os
import json
import asyncio
import logging
from typing import Dict, Any
import aiohttp
from pysignalclirestapi import SignalCliRestApi

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SignalMediationBot:
    def __init__(self):
        self.signal_number = os.getenv('SIGNAL_NUMBER', '+16507619680')
        self.webhook_url = os.getenv('WEBHOOK_URL', 'https://cqxqvxfpvcdnympknfql.supabase.co/functions/v1/signal-webhook')
        
        # Initialize Signal CLI REST API client
        # You'll need to run signal-cli-rest-api server separately
        self.signal_api_url = os.getenv('SIGNAL_API_URL', 'http://localhost:8080')
        self.signal = SignalCliRestApi(self.signal_api_url, self.signal_number)
        
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
            message = f"🕊️ **PeaceKeeper**: {response}"
            self.signal.send_message(message, [], [group_id])
            logger.info(f"Sent mediation response to group {group_id}")
        except Exception as e:
            logger.error(f"Error sending mediation response: {e}")
    
    async def listen_for_messages(self):
        """Listen for incoming messages via webhook or polling"""
        logger.info("Starting message listener...")
        
        # This is a simple polling approach
        # In production, you'd want to use webhooks or WebSocket
        while True:
            try:
                # Poll for new messages
                messages = self.signal.receive_messages()
                for message in messages:
                    await self.handle_message(message)
                    
                await asyncio.sleep(1)  # Poll every second
                
            except Exception as e:
                logger.error(f"Error in message listener: {e}")
                await asyncio.sleep(5)  # Wait before retrying
    
    async def start(self):
        """Start the Signal bot"""
        logger.info(f"Starting Signal Mediation Bot for number: {self.signal_number}")
        logger.info(f"Webhook URL: {self.webhook_url}")
        logger.info(f"Signal API URL: {self.signal_api_url}")
        
        # Start listening for messages
        await self.listen_for_messages()

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
