// Web3 configuration for Sepolia testnet
document.addEventListener('DOMContentLoaded', function() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        
        // Contract details
        const contractAddress = "0xc94EAb806e09A5e8ce30F0fE5C952B1F05288716"; // Replace with your deployed contract address
        const contractABI = [
            {
                "inputs": [
                    {"internalType": "string", "name": "_title", "type": "string"},
                    {"internalType": "string", "name": "_url", "type": "string"},
                    {"internalType": "uint256", "name": "_price", "type": "uint256"}
                ],
                "name": "registerSong",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getNumberOfSongs",
                "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                "name": "songs",
                "outputs": [
                    {"internalType": "string", "name": "title", "type": "string"},
                    {"internalType": "address", "name": "owner", "type": "address"},
                    {"internalType": "string", "name": "url", "type": "string"},
                    {"internalType": "uint256", "name": "price", "type": "uint256"}
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        
        // Initialize contract
        window.songContract = new web3.eth.Contract(contractABI, contractAddress);
        
        // Setup form submission if on add_song page
        setupAddSongForm();
    } else {
        console.log("MetaMask is not installed");
    }
});

function setupAddSongForm() {
    const form = document.getElementById('add-song-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Get form values
            const title = document.getElementById('title').value;
            const url = document.getElementById('url').value;
            const price = document.getElementById('price').value;
            
            // Convert price to wei
            const priceWei = web3.utils.toWei(price, 'ether');
            
            // Show loading message
            showMessage('Processing transaction...', 'info');
            
            // Send transaction
            window.songContract.methods.registerSong(title, url, priceWei)
                .send({ from: account })
                .on('transactionHash', function(hash) {
                    showMessage(`Transaction sent! Hash: ${hash}`, 'success');
                })
                .on('confirmation', function(confirmationNumber, receipt) {
                    if (confirmationNumber === 1) {
                        showMessage('Song registered successfully!', 'success');
                        // Redirect to home page after 3 seconds
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    }
                })
                .on('error', function(error) {
                    showMessage(`Error: ${error.message}`, 'error');
                });
                
        } catch (error) {
            showMessage(`Error: ${error.message}`, 'error');
        }
    });
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type}`;
    messageDiv.textContent = message;
    
    // Add to page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(messageDiv, container.firstChild);
    
    // Remove after 5 seconds if not an error
    if (type !== 'error') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}