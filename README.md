# Song Registry DApp

A simple Flask web application that connects to an Ethereum smart contract for registering and viewing songs on the blockchain.

## Quick Start

### Prerequisites
- Python 3.7+
- Node.js and npm

### Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/edzaniBruce51/song-registry-smart-contract.git
cd song-registry-smart-contract
npm install -g truffle ganache-cli
pip install -r requirements.txt
```

2. **Start local blockchain:**
```bash
ganache-cli --host 127.0.0.1 --port 7545 --networkId 5777 --accounts 10 --defaultBalanceEther 100
```

3. **Deploy smart contract:**
```bash
cd song-registry-contracts
truffle migrate --reset --network development
```

4. **Update configuration:**
   - Copy the contract address from deployment output
   - Copy the first account address from Ganache CLI
   - Update both addresses in `app.py` (lines 12 and 47)

5. **Run the app:**
```bash
python app.py
```

Visit `http://127.0.0.1:5000` to use the DApp.

## Features

- Register songs with title, URL, and price
- View all registered songs from the blockchain
- Simple web interface for blockchain interaction

## Tech Stack

- **Frontend:** Flask, HTML, CSS
- **Blockchain:** Solidity, Truffle, Ganache CLI
- **Integration:** Web3.py
