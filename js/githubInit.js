import { GetApi } from "./githubApi";

// Initialization: GitHub Repositories Components to Render in Portfolio Section.
const getApi = new GetApi();

getApi.getInfo("p2p");
getApi.getInfo("vue-weather");
getApi.getInfo("to-do-app");
getApi.getInfo("tip-calculator");
