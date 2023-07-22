const hre = require("hardhat");
const fs = require("fs");

async function main() {

  // Déploiement des contrats
  const Harpos = await hre.ethers.getContractFactory("Harpos");
  const harpos = await Harpos.deploy();
  await harpos.deployed();

  console.log(
    `Harpos deployed to ${harpos.address}`
  );

  fs.writeFileSync(
    "addresses/nRTPresale.json",
    JSON.stringify({ address: nRTPresale.address }, undefined, 2)
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
