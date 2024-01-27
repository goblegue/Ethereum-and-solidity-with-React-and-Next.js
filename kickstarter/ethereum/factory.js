import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2B31A07961811B8930e6aCDCE2E747Cd0322b100",
);

export default instance;
