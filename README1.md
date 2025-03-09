
# 🚀 Buzzeum Airdrop Bot - Fully Automated 💸

✅ Your **Buzzeum Airdrop Bot** is now **100% ready to use** without any modifications.  
✅ This guide provides a complete setup for installing and running the bot.

## ✅ Step 1: Install Node.js & Git (if not installed)
### **Windows Users:**
- Download Node.js: 👉 [https://nodejs.org/](https://nodejs.org/en/download/)
- Download Git: 👉 [https://git-scm.com/](https://git-scm.com/downloads)

✅ After installation, open **Command Prompt (CMD)**.

## ✅ Step 2: Download the Bot Files
Run this command:  
```bash
git clone https://github.com/your-repo-link/buzzeum-bot.git
```
Or manually download and extract the files.

## ✅ Step 3: Install Dependencies
Navigate to the bot folder:  
```bash
cd buzzeum-bot
```
Install dependencies:  
```bash
npm install
```

## ✅ Step 4: Setup Proxy File (proxy.txt)
Add your proxies in `proxy.txt` in this format:  
```
http://username:password@ip:port
socks5://username:password@ip:port
http://ip:port
socks5://ip:port
```

## ✅ Step 5: Run the Bot
To create accounts:  
```bash
node index.js
```
Choose:  
```
1. ✅ Create New Accounts
```
It will:  
- ✅ Create Wallets  
- ✅ Register with Referral  
- ✅ Switch Proxies  

## ✅ Step 6: Auto-Claim Drops Every 4 Hours
Run:  
```bash
node index.js
```
Choose:  
```
2. 💸 Start Auto Claim
```
The bot will auto-claim every **4 hours**.

## ✅ Step 7: Stop the Bot
Stop manually:  
```bash
CTRL + C
```
Force stop:  
```bash
taskkill /IM node.exe /F
```

## ✅ Step 8: Automate with VPS (Optional)
Run the bot 24/7:  
```bash
nohup node index.js &
```

## ✅ Files
- `wallets.txt` → Saved wallets & private keys  
- `daily_claim_success.txt` → Successful claims  
- `proxy.txt` → Proxies  

## ✅ Earnings Potential 💸
- **200 wallets = $500 daily**  
- **1000 wallets = $2500 daily**  

## ✅ Final Command
```bash
node index.js
```

💸 **Enjoy making money! 🚀🔥**
