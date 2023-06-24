// imports
// using run we can do tasks in the CLI from the program itself
const { ethers, run, network } = require("hardhat");
require("dotenv").config();
// network.configuration by importing network

// async main
async function main() {
    // const simpleStorageFactory = await ethers.getContractFactory(
    //     "SimpleStorage"
    // );
    console.log("step1");
    const simpleStorage = await ethers.deployContract("SimpleStorage");
    await simpleStorage.waitForDeployment();
    console.log("step2");
    // console.log(`deploy at ${simpleStorage.getAddress().then(address)}`);
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deploymentTransaction.wait(6); // waits for 6 transaction before verifying
        await verify(simpleStorage.address);
    }
    // console.log(network.config); // returns an object with all the info about the network

    // interacting with the simple storage contract
    const currentValue = await simpleStorage.retrieve();
    console.log(`current value ${currentValue}`);

    // updatiing the current value
    const updateValue = await simpleStorage.store(7);
    await updateValue.wait();
    const updatedValue = await simpleStorage.retrieve();
    console.log(`updated Value ${updatedValue}`);
}

async function verify(contractAddress, args) {
    // code to verify the contract automatically/programatically after they've been deployed
    // no need to verify for the local hardhat network

    try {
        // run accepts two params
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verifed");
        } else {
            console.log(e);
        }
    }
}

// calling main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
