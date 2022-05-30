const Emyem = artifacts.require("Emyem");
const FirstPresale = artifacts.require("FirstPresale");
const SecondPresale = artifacts.require("SecondPresale");
const TeamVesting = artifacts.require("TeamVesting");

module.exports = async function (deployer) {
  await deployer.deploy(FirstPresale, "0x85732427df4874db73600685072D54b99e72C9cA");
  const firstPresale = await FirstPresale.deployed();

  await deployer.deploy(SecondPresale, "0x85732427df4874db73600685072D54b99e72C9cA");
  const secondPresale = await SecondPresale.deployed();

  await deployer.deploy(TeamVesting, "0x85732427df4874db73600685072D54b99e72C9cA");
  const teamVesting = await TeamVesting.deployed();

  await deployer.deploy(Emyem, "0x85732427df4874db73600685072D54b99e72C9cA", "0x31c29d407fb5e2d1073137ADa2C48D4AFB06F8e8", firstPresale.address, secondPresale.address, teamVesting.address);
  const emyem = await Emyem.deployed();

  await firstPresale.setToken(emyem.address);
  await secondPresale.setToken(emyem.address);
  await teamVesting.setToken(emyem.address);
};