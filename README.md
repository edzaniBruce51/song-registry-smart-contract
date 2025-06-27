#  Song Registry DApp - Blockchain Music Platform

A full-stack decentralized application (DApp) that demonstrates how to integrate Flask web development with Ethereum blockchain technology. This project showcases a simple music registry where users can register songs on the blockchain and view all registered tracks.

##  Project Overview

This DApp combines traditional web development with blockchain technology to create a decentralized song registry. It demonstrates the fundamental concepts of Web3 development, smart contract interaction, and blockchain data management through a clean, educational interface.

###  Features

- ** Blockchain Integration**: Direct connection to Ethereum blockchain via Web3.py
- ** Song Registration**: Add songs with title, URL, and price to the blockchain
- ** Data Visualization**: View all registered songs from the smart contract
- ** Price Management**: Set and display song prices in ETH
- ** Clean UI**: Minimal, responsive web interface for easy learning
- ** Educational Focus**: Well-commented code for blockchain learning

##  Technology Stack

### Backend
- **Flask** - Python web framework
- **Web3.py** - Ethereum blockchain interaction
- **Solidity** - Smart contract development

### Blockchain
- **Ganache CLI** - Local Ethereum blockchain
- **Truffle** - Smart contract compilation and deployment
- **Ethereum** - Blockchain platform

### Frontend
- **HTML5** - Structure and content
- **CSS3** - Styling and responsive design
- **Jinja2** - Template engine

##  Complete Setup Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/edzaniBruce51/song-registry-smart-contract.git
cd song-registry-smart-contract
```

### Step 2: Install Global Dependencies
```bash
# Install Truffle and Ganache CLI globally
npm install -g truffle ganache-cli
```

### Step 3: Install Python Dependencies
```bash
# Install Flask and Web3.py
pip install -r requirements.txt
```

### Step 4: Start Ganache CLI (Local Blockchain)
Open a **new terminal window** and run:
```bash
ganache-cli --host 127.0.0.1 --port 7545 --networkId 5777 --accounts 10 --defaultBalanceEther 100
```

**Important**: Keep this terminal running throughout the entire process!

You should see output like:
```
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0x589dAbC24C0d94EF42264fdDCB326bf2510b3B57 (100 ETH)
(1) 0x1234567890abcdef... (100 ETH)
...

Private Keys
==================
(0) 0xabc123def456...
(1) 0x789xyz012...
...

Listening on 127.0.0.1:7545
```

** Copy the first account address** - you'll need it later!

### Step 5: Deploy Smart Contracts
Open a **second terminal window** in your project directory:
```bash
cd song-registry-contracts
truffle migrate --reset --network development
```

You should see successful deployment output:
```
Deploying 'SongRegistry'
   ------------------------
   > transaction hash:    0x...
   > contract address:    0x50C0b823975dad93274b11b101e041f92353D3ea
   > block number:        2
   > account:             0x589dAbC24C0d94EF42264fdDCB326bf2510b3B57
   > balance:             99.85
   > gas used:            376865
   > total cost:          0.0075373 ETH
```

** Copy the contract address** - you'll need it for the next step!

### Step 6: Update Flask App Configuration
Open `app.py` and update these two lines with your actual values:

```python
# Line 12: Update with your deployed contract address
CONTRACT_ADDRESS = Web3.to_checksum_address('0x50C0b823975dad93274b11b101e041f92353D3ea')

# Line 47: Update with your first Ganache account
DEFAULT_ACCOUNT = Web3.to_checksum_address('0x589dAbC24C0d94EF42264fdDCB326bf2510b3B57')
```

**Replace the addresses above with your actual addresses from Steps 4 and 5!**

### Step 7: Run the Flask Application
In your **main terminal** (not the Ganache CLI terminal):
```bash
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Step 8: Access Your DApp
Open your web browser and visit:
```
http://127.0.0.1:5000
```

 **Congratulations!** Your Song Registry DApp is now running!

##  Testing Your DApp

### Add Your First Song
1. Click **"Add Song"** in the navigation
2. Fill out the form:
   - **Song Title**: "My First Blockchain Song"
   - **Song URL**: "https://example.com/my-song.mp3"
   - **Price (ETH)**: "0.01"
3. Click **"Register Song"**
4. You should see a success message (transaction is built but not sent in this demo)

### View Registered Songs
1. Click **"View Songs"** to return to the home page
2. You should see your registered songs displayed



### Reset Everything
If you encounter persistent issues:
```bash
# 1. Stop Ganache CLI (Ctrl+C)
# 2. Restart Ganache CLI
ganache-cli --host 127.0.0.1 --port 7545 --networkId 5777 --accounts 10 --defaultBalanceEther 100

# 3. Redeploy contracts
cd song-registry-contracts
truffle migrate --reset --network development

# 4. Update app.py with new addresses
# 5. Restart Flask app
python app.py
```

##  Project Structure

```
song-registry-smart-contract/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── README.md                      # This documentation
├── .gitignore                     # Git ignore rules
├── templates/
│   ├── base.html                  # Base template with navigation
│   ├── index.html                 # Home page - view all songs
│   └── add_song.html              # Add new song form
└── song-registry-contracts/
    ├── contracts/
    │   └── songRegistry.sol       # Solidity smart contract
    ├── migrations/
    │   └── 1_initial_migration.js # Contract deployment script
    └── truffle-config.js          # Truffle configuration
```
```

##  How It Works

### Blockchain Connection
```python
# Connect to local Ganache blockchain
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

# Create contract instance
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
```

### Reading from Blockchain
```python
# Get number of songs (free operation)
num_songs = contract.functions.getNumberOfSongs().call()

# Get song details (free operation)
song_data = contract.functions.songs(0).call()
```

### Building Transactions
```python
# Build transaction to add song (costs gas)
transaction = contract.functions.registerSong(title, url, price).build_transaction({
    'from': DEFAULT_ACCOUNT,
    'gas': 2000000,
    'gasPrice': w3.to_wei('20', 'gwei')
})
```

##  Smart Contract Functions

### Core Functions
- `registerSong(title, url, price)` - Add a new song to the registry
- `getNumberOfSongs()` - Get total number of registered songs
- `songs(index)` - Retrieve song details by index

### Data Structure
```solidity
struct Song {
    string title;    // Song title
    address owner;   // Owner's Ethereum address
    string url;      // Song URL
    uint256 price;   // Price in wei
}
```

##  Learning Objectives

This project teaches:

1. **Blockchain Basics**: Understanding how data is stored on blockchain
2. **Smart Contract Interaction**: Reading from and writing to contracts
3. **Web3 Integration**: Connecting web apps to blockchain networks
4. **Transaction Building**: Creating blockchain transactions
5. **DApp Architecture**: Structuring decentralized applications

##  Key Code Examples

### Connecting to Blockchain
```python
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
```

### Reading Blockchain Data
```python
num_songs = contract.functions.getNumberOfSongs().call()
song_data = contract.functions.songs(0).call()
```

### Building Transactions
```python
transaction = contract.functions.registerSong(title, url, price).build_transaction({
    'from': DEFAULT_ACCOUNT,
    'gas': 2000000,
    'gasPrice': w3.to_wei('20', 'gwei')
})
```

### Current State
- Transactions are built but not automatically signed/sent (educational safety)
- Uses local blockchain only (Ganache)
- Simplified contract without advanced features

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Acknowledgments

Built as a learning project to demonstrate the integration of traditional web development with blockchain technology. Perfect for developers new to Web3 and DApp development.


