const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const { getFunctionDocumentation } = require("typechain");

// mocha tests
describe("Simple Storage", function () {
    // best practice for callback in test
    // beforeEach block would run before executing
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async function () {
        // simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await ethers.deployContract("SimpleStorage");
    });

    it("should start with a favourite number 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expected = "0";

        assert.equal(currentValue.toString(), expected);
    });

    it("should update the favourite number if store is called", async function () {
        await simpleStorage.store(7);
        const updatedValue = await simpleStorage.retrieve();
        expect(updatedValue.toString()).to.equal("7");
    });

    it("should add a person and its favourite number in the list", async function () {
        await simpleStorage.addPerson("akshit", 69);
        const favNom = await simpleStorage.nameToFavoriteNumber("akshit");
        expect(favNom.toString()).to.equal("69");
    });
});
