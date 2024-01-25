import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x3516E2CB99374fB6fB00762ADD75Decd1121a94D"
);

export default instance;
