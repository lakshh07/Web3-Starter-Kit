require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `${process.env.MUMBAI_ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PK}`],
    },
    rinkeby: {
      url: `${process.env.RINKEBY_ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PK}`],
    },
    mumbai: {
      url: `${process.env.MUMBAI_ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PK}`],
    },
    polygon: {
      url: `${process.env.POLYGON_ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PK}`],
    },
  },
  abiExporter: {
    path: "../next-app/contracts/ABI",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },
  etherscan: {
    api: process.env.ETHERSCAN_KEY,
  },
};
