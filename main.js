const axios = require('axios');
const fs = require('fs');
const ethers = require('ethers');
const readline = require('readline');
const { SocksProxyAgent } = require('socks-proxy-agent');
const { HttpsProxyAgent } = require('https-proxy-agent');
const chalk = require('chalk').default;

let proxyIndex = 0; // Start from the first proxy

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const delay = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

const getProxies = () => {
    const proxies = fs.readFileSync('proxy.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
    return proxies;
};

const getAxiosInstance = (proxy) => {
    const instance = axios.create({
        timeout: Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000
    });

    if (proxy) {
        if (proxy.startsWith('socks')) {
            const agent = new SocksProxyAgent(proxy);
            instance.defaults.httpsAgent = agent;
        } else if (proxy.startsWith('http')) {
            const agent = new HttpsProxyAgent(proxy);
            instance.defaults.httpsAgent = agent;
        }
    }

    return instance;
};

const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    console.log(chalk.green(`✅ New Wallet: ${wallet.address}`));
    return wallet;
};

const registerWallet = async (wallet, referral, axiosInstance) => {
    try {
        const payload = { address: wallet.address, invited_by: referral };
        const response = await axiosInstance.post('https://airdrop.buzzeum.space/server.php', payload);
        if (response.data.success) {
            console.log(chalk.green(`✅ Registered: ${wallet.address}`));
            return true;
        }
    } catch (error) {
        console.log(chalk.red(`❌ Registration Failed for ${wallet.address}`));
    }
    return false;
};

const getSignMessage = async (wallet, axiosInstance) => {
    try {
        const response = await axiosInstance.get(`https://api.x.ink/v1/get-sign-message2?walletAddress=${wallet.address}`);
        return response.data.message;
    } catch (error) {
        console.log(chalk.red(`❌ Failed to Get Signing Message for ${wallet.address}`));
    }
    return null;
};

const signMessage = async (wallet, message) => {
    try {
        return await wallet.signMessage(message);
    } catch (error) {
        console.log(chalk.red(`❌ Failed to Sign Message for ${wallet.address}`));
    }
    return null;
};

const claimDrops = async (wallet, signature, axiosInstance) => {
    try {
        const payload = { uad: wallet.address, sgn: signature };
        const response = await axiosInstance.post('https://airdrop.buzzeum.space/claimDrops.php', payload);

        if (response.data.success) {
            console.log(chalk.green(`💸 Claimed: ${response.data.amount} for ${wallet.address}`));
            fs.appendFileSync('daily_claim_success.txt', `${wallet.address}:${response.data.amount}\n`);
            return true;
        }
    } catch (error) {
        console.log(chalk.red(`❌ Failed to Claim for ${wallet.address}`));
    }
    return false;
};

const processAccount = async (referral, proxy) => {
    const axiosInstance = getAxiosInstance(proxy);
    const wallet = generateWallet();

    const registered = await registerWallet(wallet, referral, axiosInstance);
    if (!registered) return;

    const message = await getSignMessage(wallet, axiosInstance);
    if (!message) return;

    const signature = await signMessage(wallet, message);
    if (!signature) return;

    await claimDrops(wallet, signature, axiosInstance);

    fs.appendFileSync('wallets.txt', `${wallet.address} : ${wallet.privateKey}\n`);
    console.log(chalk.blue(`💾 Wallet Saved: ${wallet.address} : ${wallet.privateKey}`));
};

const autoClaimDrops = async () => {
    while (true) {
        console.log(chalk.yellow('🚀 Starting Auto Claim Drops Session...'));

        const wallets = fs.readFileSync('wallets.txt', 'utf-8').split('\n').filter(line => line.trim() !== '');
        for (const line of wallets) {
            const [address, privateKey] = line.split(' : ');
            if (!address || !privateKey) continue;

            const proxy = getNextProxy();
            const axiosInstance = getAxiosInstance(proxy);

            const wallet = new ethers.Wallet(privateKey.trim());
            const message = await getSignMessage(wallet, axiosInstance);
            if (!message) continue;

            const signature = await signMessage(wallet, message);
            if (!signature) continue;

            await claimDrops(wallet, signature, axiosInstance);
            await delay(3000, 5000);
        }

        console.log(chalk.magenta('⏳ Waiting 4 Hours Before Next Auto Claim...'));
        await delay(14400000, 14410000);
    }
};

const getNextProxy = () => {
    const proxies = getProxies();
    if (proxyIndex >= proxies.length) proxyIndex = 0;
    const proxy = proxies[proxyIndex];
    proxyIndex++;
    console.log(chalk.green(`✅ Using Proxy: ${proxy}`));
    return proxy;
};

const startAccountCreation = async () => {
    const numAccounts = parseInt(await askQuestion(chalk.yellow('💎 How many accounts to create? ')));
    const referral = await askQuestion(chalk.yellow('🎁 Enter your referral code: '));

    for (let i = 0; i < numAccounts; i++) {
        const proxy = getNextProxy();
        console.log(chalk.cyan(`\n🚀 Creating Account #${i + 1} Using Proxy...`));
        await processAccount(referral, proxy);
        await delay(10000, 15000);
    }

    console.log(chalk.green(`✅ ${numAccounts} Accounts Successfully Created!`));
};

const mainMenu = async () => {
    console.clear();
    console.log(chalk.green(`
    🚀 Buzzeum Airdrop Bot - ⚔ ArThuR🛡️
    1. ✅ Create New Accounts
    2. 💸 Start Auto Claim
    3. ❌ Exit
    `));

    const option = await askQuestion(chalk.blue('👉 Choose an option: '));
    if (option === '1') {
        await startAccountCreation();
    } else if (option === '2') {
        await autoClaimDrops();
    } else if (option === '3') {
        console.log(chalk.red('👋 Exiting...'));
        process.exit();
    }

    mainMenu();
};

mainMenu();
