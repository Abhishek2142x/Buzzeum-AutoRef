# Buzzeum-AutoRef
This Buzzeum Airdrop Bot automates the process of creating new accounts, registering with a referral code, signing messages, and claiming daily airdrop rewards. It supports proxy rotation, automatic wallet generation, and auto-claim every 4 hours. The bot also logs successful claims and saves wallet credentials for future use.

## Features

- Optimized delays for improved efficiency
- Added multi-threading for faster processing
- Improved error handling to prevent unexpected crashes
- Dynamic proxy rotation on failures or timeouts
- Wallet balance checks to ensure successful claims
- Separate logs for successful and failed claims
- Clear command instructions for running the bot

## Prerequisites

- Node.js v14 or higher
- An active Buzzeum account

## 🛠️ Installation

### ✅ Step 1: Clone this repository

```bash
git clone https://github.com/Abhishek2142x/Buzzeum-AutoRef.git
cd Buzzeum-AutoRef
```

### ✅ Step 2: Install Dependencies

```bash
npm install axios ethers chalk https-proxy-agent socks-proxy-agent readline
```

### ✅ Step 3. Setup Proxy File (proxy.txt)
Add your proxies in `proxy.txt` in this format:  
```
http://username:password@ip:port
socks5://username:password@ip:port
http://ip:port
socks5://ip:port
```

### ✅ Step 4: Run the Bot
 
```bash
node main.js
```
## 🚀 How to Run Script

```bash
node main.js
```
Choose:  

###  1. ✅ Create New Accounts

It will:  
- Create Wallets  
- Register with Referral  
- Save created wallets in wallets.txt in address:private key 

### 2 💸 Start Auto Claim

The bot will auto-claim every **4 hours**.

## ✅ How to Stop the Bot

Stop manually:  
```bash
CTRL + C
```
## 💡 Important Notes:

🚀 DO NOT SHARE YOUR PRIVATE KEYS from wallets.txt.
💸 The bot will automatically switch proxies after each request.
🕐 The bot will automatically claim drops every 4 hours.
💯 Maximum profit = more wallets + more proxies + more referrals.

## Disclaimer
- You can just run this bot at your own risk, I'm not responsible for any loss or damage caused by this bot.
- This bot is for educational purposes only.
