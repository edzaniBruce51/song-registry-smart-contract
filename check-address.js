const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  try {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    console.log("Your wallet address:", wallet.address);
    
    // Check balance
    const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
    const balance = await provider.getBalance(wallet.address);
    console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();