const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Blockchain4All",
      cost: tokens(1),
      tickets: 200,
      date: "Aug 21",
      time: "6:00PM WAT",
      location: "Abuja, Nigeria"
    },
    {
      name: "XPRO Nigeria",
      cost: tokens(1),
      tickets: 125,
      date: "Sep 5",
      time: "1:00PM WAT",
      location: "Minna, Nigeria - Legbo kutigi Hall"
    },
    {
      name: "ETH Privacy Hackathon",
      cost: tokens(0.2),
      tickets: 0,
      date: "May 9",
      time: "10:00AM TRT",
      location: "Turkey, Istanbul"
    },
    {
      name: "Blockchain Summit Africa",
      cost: tokens(2),
      tickets: 250,
      date: "Sep 11",
      time: "2:30PM WAT",
      location: "Radison Blu, Lagos, Nigeria"
    },
    {
      name: "Devcon Africa 2025",
      cost: tokens(1.5),
      tickets: 125,
      date: "Oct 23",
      time: "11:00AM WAT",
      location: "Abuja, Nigeria - International Conference Center"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});