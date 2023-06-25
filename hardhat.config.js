require("dotenv").config();
require("./tasks/block-number");
require("hardhat-gas-reporter");

require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-etherscan");

const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "etherscan api not exists";
const COINMARKETCAP =
    process.env.COINMARKETCAP_API_KEY || "coin market cap api not exists";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.8",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: LOCAL_PRIVATE_KEY, not needed as hardhat has taken care of it
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "INR",
        coinmarketcap: COINMARKETCAP,
    },
};
