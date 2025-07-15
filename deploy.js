async function main() {
  const SongRegistry = await ethers.getContractFactory("SongRegistry");
  const songRegistry = await SongRegistry.deploy();
  await songRegistry.deployed();

  console.log("Contract deployed to:", songRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});