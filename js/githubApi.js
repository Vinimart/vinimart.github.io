import { GithubApiView } from "./GithubApiView";
import { access } from "./GitHubToken";

// This class is responsible for fetching the data from Github API.
export class GetApi {
	constructor() {
		this.view = new GithubApiView();
		// This number is a reference to portfolio modal's ID.
		this.modalNumber = 1;
	}

	// This method is responsible for validating the repository name and setting the argument for githubFetch().
	// In case of an invalid argument the program will not break.
	getInfo(repo) {
		this.repo = repo.toString();
		if (this.repo) {
			// Increments modal number every time when a portfolio component is rendered;
			return this.githubFetch(this.repo, this.modalNumber++);
		} else {
			return console.error(`"${this.repo}": getInfo requires a valid string as argument at initialization.`);
		}
	}

	// HTTP Request
	async githubFetch(repo, modal) {
		// userName and gitHubToken imported from "./gitHubToken.js".
		const response = await fetch(`https://api.github.com/repos/${access.userName}/${repo}?client_id=${access.userName}&client_secret=${access.gitHubToken}`);

        // Data and error handling
		if (response.status === 200) {
			const data = await response.json();
			this.setResults(data, modal);
		} else {
			console.error(`Error trying to reach "${repo}" repository. Request status: ${response.status}`);
			this.view.renderPortfolioError(response.status, access.userName);
		}
	}

	// Set the response from the request to the View layer.
	setResults(data, modal) {
		this.data = data;
		this.modalNumber = modal;
		this.url = this.data.svn_url;
		this.name = this.data.name;
		this.desc = this.data.description;
        this.info = [this.name, this.url, this.desc, this.modalNumber];
        
		this.view.setInfo(this.info);
	}
}
