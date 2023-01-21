require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const TEST_URL = process.env.TEST_URL;
const TEST_PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOERLI_TEST_URL = process.env.GOERLI_TEST_URL;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
console.log(TEST_URL);
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: TEST_URL,
      accounts: [TEST_PRIVATE_KEY],
    },
    goerlitestnet: {
      url: GOERLI_TEST_URL,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  // localhost: {
  //   url: config.LOC_URL,
  //   accounts: [config.LOC_PRIVATE_KEY],
  // },
};
