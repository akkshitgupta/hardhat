const { task } = require("hardhat/config");

// a task can also interact with a smart contract
// a task can be better used for plugins and scripts for the development

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
