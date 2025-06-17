from flask import Flask, render_template, request, redirect, url_for, flash
from web3 import Web3
import json

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Connect to local blockchain (Ganache)
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

# Contract details - you'll need to update these after deploying
CONTRACT_ADDRESS = Web3.to_checksum_address('0x50C0b823975dad93274b11b101e041f92353D3ea')  # New working contract address
CONTRACT_ABI = [
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
]

# Default account (first account from Ganache CLI)
DEFAULT_ACCOUNT = Web3.to_checksum_address('0x589dAbC24C0d94EF42264fdDCB326bf2510b3B57')

@app.route('/')
def index():
    """Display all songs from the smart contract"""
    try:
        # Create contract instance
        contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

        # Get number of songs
        num_songs = contract.functions.getNumberOfSongs().call()

        # Get all songs
        songs = []
        for i in range(num_songs):
            song_data = contract.functions.songs(i).call()
            songs.append({
                'id': i,
                'title': song_data[0],
                'owner': song_data[1],
                'url': song_data[2],
                'price': w3.from_wei(song_data[3], 'ether')  # Convert from wei to ether
            })

        return render_template('index.html', songs=songs)

    except Exception as e:
        flash(f'Error connecting to blockchain: {str(e)}', 'error')
        return render_template('index.html', songs=[])

@app.route('/add_song', methods=['GET', 'POST'])
def add_song():
    """Add a new song to the registry"""
    if request.method == 'POST':
        try:
            title = request.form['title']
            url = request.form['url']
            price_ether = float(request.form['price'])

            # Convert price to wei
            price_wei = w3.to_wei(price_ether, 'ether')

            # Create contract instance
            contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)

            # Build transaction
            transaction = contract.functions.registerSong(title, url, price_wei).build_transaction({
                'from': DEFAULT_ACCOUNT,
                'gas': 2000000,
                'gasPrice': w3.to_wei('20', 'gwei'),
                'nonce': w3.eth.get_transaction_count(DEFAULT_ACCOUNT)
            })

            # Note: In a real app, you'd sign this transaction with a private key
            # For this demo, we'll show how the transaction would be built
            flash(f'Transaction built successfully! Title: {title}, Price: {price_ether} ETH', 'success')
            flash('Note: In a real app, this transaction would be signed and sent to the blockchain', 'info')

            return redirect(url_for('index'))

        except Exception as e:
            flash(f'Error adding song: {str(e)}', 'error')

    return render_template('add_song.html')

if __name__ == '__main__':
    app.run(debug=True)
