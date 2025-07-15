# Song Registry DApp

A Flask web application that connects to Ethereum smart contracts for registering and viewing songs on the blockchain. Features MetaMask integration for secure transactions on Sepolia testnet.

## Quick Start

### Prerequisites
- Python 3.7+
- Node.js and npm
- MetaMask browser extension
- Sepolia testnet ETH

### Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/edzaniBruce51/song-registry-smart-contract.git
cd song-registry-smart-contract
npm install
pip install -r requirements.txt
```

2. **Configure environment:**
   - Create `.env` file with your Alchemy API URL and private key
   - Ensure you have Sepolia testnet ETH in your wallet

3. **Deploy smart contract:**
```bash
npx hardhat run deploy.js --network sepolia
```

4. **Update configuration:**
   - Copy the deployed contract address
   - Update the contract address in both `app.py` and `static/js/web3-config.js`

5. **Run the app:**
```bash
python app.py
```

Visit `http://127.0.0.1:5000` to use the DApp.

## Features

- Register songs with title, URL, and price using MetaMask
- View all registered songs from the blockchain
- Secure wallet integration for transactions
- Sepolia testnet deployment ready

## Tech Stack

- **Frontend:** Flask, HTML, CSS, JavaScript
- **Blockchain:** Solidity, Hardhat, Sepolia testnet
- **Integration:** Web3.py, MetaMask, Alchemy
