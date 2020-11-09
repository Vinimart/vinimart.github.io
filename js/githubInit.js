const GithubInit = [
    "p2p", 
    "vue-weather", 
    "to-do-app", 
    "tip-calculator"
];

module.exports = GithubInit;

const githubApi = require("./githubApi");

// import { GetApi } from "./githubApi.js";

// "p2p", "vue-weather", "to-do-app", "tip-calculator"

// Initialization: GitHub Repositories Components to Render in Portfolio Section.
const getApi = new githubApi();

getApi.getInfo(GithubInit[0]);
getApi.getInfo(GithubInit[1]);
getApi.getInfo(GithubInit[2]);
getApi.getInfo(GithubInit[3]);
