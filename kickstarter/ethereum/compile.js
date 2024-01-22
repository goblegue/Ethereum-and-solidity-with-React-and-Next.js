const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const Buildpath = path.resolve(__dirname, "build");
fs.removeSync(Buildpath);

const CampaignFactorypath = path.resolve(
  __dirname,
  "contracts",
  "CampaignFactory.sol"
);

const source = fs.readFileSync(CampaignFactorypath, "utf-8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(Buildpath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(Buildpath, contract.replace(":","")+".json"),
    output[contract]
  );
}

