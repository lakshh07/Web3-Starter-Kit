const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const greeterAddress = "${greeter.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
