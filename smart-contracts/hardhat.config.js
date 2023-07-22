require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); //installs itself with hardhat packages (normally)

const PK = process.env.PK || "";
const ALCHEMY = process.env.ALCHEMY || "";
const POLYGONSCAN = process.env.POLYGONSCAN || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      allowUnlimitedContractSize: true //to enable contracts interaction in /backend/scripts/deploy.js
    },
    polygonMumbai: {
      url: ALCHEMY,
      accounts: [`0x${PK}`],
      chainId: 80001
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
    ],
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN,
      polygonMumbai: POLYGONSCAN
      //polygonMumbai: POLYGONSCAN
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  }
};