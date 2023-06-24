const { task } = require("hardhat/config");

task("block-number", "prints the current block number").setAction(
    // defining an anonymous function
    async (taskArgs, hre) => {
        // hre is similar to require("hardhat") in the deploy.js file
        // hre can access all the methods
        const currentBlock = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number is ${currentBlock}`);
    }
);

module.exports = {};
