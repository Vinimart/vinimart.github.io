import { GetApi } from "./GitHubApi";

class GitHubInit {
    constructor() {
        this.getApi = new GetApi();
    }

	addRepo(repo) {
		this.repo = [];
		this.repo.push(...repo);
		this.repo.forEach((item) => {
			this.getApi.getInfo(item);
		});
	}
}

const gitHubInit = new GitHubInit();
gitHubInit.addRepo([
    "p2p", 
    "vue-weather", 
    "to-do-app", 
    "tip-calculator",
    "mundiware-assessment"
]);
