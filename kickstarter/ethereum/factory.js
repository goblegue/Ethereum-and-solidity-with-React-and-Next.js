import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x33D08232457AdBb7584dB5cd609dE016D38f39A6"
);

export default instance;
