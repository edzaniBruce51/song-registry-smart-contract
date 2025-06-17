# Song Registry DApp - Blockchain Music Platform

A full-stack decentralized application (DApp) that demonstrates how to integrate Flask web development with Ethereum blockchain technology. This project showcases a simple music registry where users can register songs on the blockchain and view all registered tracks.

## Project Overview

This DApp combines traditional web development with blockchain technology to create a decentralized song registry. It demonstrates the fundamental concepts of Web3 development, smart contract interaction, and blockchain data management through a clean, educational interface.

### Features

- ** Blockchain Integration**: Direct connection to Ethereum blockchain via Web3.py
- ** Song Registration**: Add songs with title, URL, and price to the blockchain
- ** Data Visualization**: View all registered songs from the smart contract
- ** Price Management**: Set and display song prices in ETH
- ** Clean UI**: Minimal, responsive web interface for easy learning
- ** Educational Focus**: Well-commented code for blockchain learning

## Technology Stack

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

## Prerequisites

- Python 3.7+
- Node.js and npm
- Truffle Suite
- Ganache CLI

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/song-registry-dapp.git
cd song-registry-dapp
```

### 2. Install Dependencies
```bash
# Python dependencies
pip install -r requirements.txt

# Truffle (if not installed globally)
npm install -g truffle ganache-cli
```

### 3. Start Local Blockchain
```bash
ganache-cli --host 127.0.0.1 --port 7545 --networkId 5777 --accounts 10 --defaultBalanceEther 100
```

### 4. Deploy Smart Contract
```bash
cd song-registry-contracts
truffle migrate --reset --network development
```

### 5. Update Configuration
Update `app.py` with your contract address and account from Ganache output.

### 6. Run the Application
```bash
python app.py
```

Visit `http://127.0.0.1:5000` to see your DApp in action!

## Project Structure

```
song-registry-dapp/
├── app.py                          # Main Flask application
├── requirements.txt                # Python dependencies
├── README.md                      # Project documentation
├── templates/
│   ├── base.html                  # Base template with navigation
│   ├── index.html                 # Home page - view all songs
│   └── add_song.html              # Add new song form
└── song-registry-contracts/
    ├── contracts/
    │   └── songRegistry.sol       # Smart contract
    ├── migrations/
    │   └── 1_initial_migration.js # Deployment script
    └── truffle-config.js          # Truffle configuration
```

## Smart Contract Functions

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

## Learning Objectives

This project teaches:

1. **Blockchain Basics**: Understanding how data is stored on blockchain
2. **Smart Contract Interaction**: Reading from and writing to contracts
3. **Web3 Integration**: Connecting web apps to blockchain networks
4. **Transaction Building**: Creating blockchain transactions
5. **DApp Architecture**: Structuring decentralized applications

## Key Code Examples

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

## Current Limitations & Future Enhancements

### Current State
- Transactions are built but not automatically signed/sent (educational safety)
- Uses local blockchain only (Ganache)
- Simplified contract without advanced features

### Potential Enhancements
- [ ] MetaMask integration for wallet connectivity
- [ ] Song purchasing functionality
- [ ] User authentication system
- [ ] IPFS integration for decentralized file storage
- [ ] Testnet deployment (Goerli, Sepolia)
- [ ] Advanced search and filtering
- [ ] Artist profiles and royalty distribution

## Contributing

Contributions are welcome! This project is designed for learning, so improvements that enhance educational value are especially appreciated.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Educational Resources

- [Ethereum Documentation](https://ethereum.org/developers/)
- [Web3.py Documentation](https://web3py.readthedocs.io/)
- [Truffle Suite](https://trufflesuite.com/)
- [Solidity Documentation](https://docs.soliditylang.org/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built as a learning project to demonstrate the integration of traditional web development with blockchain technology. Perfect for developers new to Web3 and DApp development.

---

**⭐ Star this repository if it helped you learn blockchain development!**
