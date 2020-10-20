// This class is responsable for fetching the data from Github API.
class GetApi {
	constructor() {
        this.view = new GithubApiView();
        // This number is a reference to portfolio modal's ID.
		this.modalNumber = 1;
	}

	// This method is responsable for validating the repository name and setting the argument for githubFetch().
	getInfo(repo) {
		if (repo) {
			// Increments modal number every time when a portfolio component is rendered;
			return this.githubFetch(repo, this.modalNumber++);
		} else {
			return console.error("Please insert a valid repository name as argument for getInfo method.");
		}
	}

	// Request
	async githubFetch(repo, modal) {
		const response = await fetch(`https://api.github.com/repos/Vinimart/${repo}`);

		if (response.status === 200) {
			const data = await response.json();
			this.setResults(data, modal);
		} else console.error(`Could not find "${repo}" repository. Request status: ${response.status}`);
	}

	// Set the response from the request to the View layer.
	setResults(data, modal) {
		this.data = data;
		this.modalNumber = modal;
		this.url = this.data.svn_url;
		this.name = this.data.name;
		this.desc = this.data.description;
		this.info = [this.url, this.name, this.desc];
		this.view.setInfo(this.info, this.modalNumber);
	}
}

class GithubApiView {
	constructor() {
		this.portfolioContainer = document.getElementById("portfolioContainer");
	}

	// Set info arguments into the renderer method.
	setInfo(info, modal) {
		this.info = info;
		this.portfolioModal = modal;
		this.renderPortfolioGrid(this.info[1], this.info[0], this.portfolioModal);
	}

	// Insert portfolio component after the last child of main container.
	renderPortfolioGrid(name, url, modal) {
		this.portfolioContainer.insertAdjacentHTML("beforeend", this.portfolioTemplate(name, url, modal));
	}

	// Portfolio item component template.
	portfolioTemplate(name, url, modal) {
		return `
        <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${modal}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src="assets/img/portfolio/${name}.png"
                        onerror="this.onerror=null; this.src='https://via.placeholder.com/356x245/505050/FED136?text=${name}';"
                        alt="${name} project thumbnail" />
                </a>

                <div class="portfolio-caption">
                    <div class="portfolio-caption-heading mb-2">${name}</div>
                    <a href="https://vinimart.github.io/${name}">
                        <button type="button" class="btn btn-outline-primary btn-sm">
                            <i class="far fa-window-restore mr-1"></i>
                            <span>View</span>
                        </button></a>

                    <a href="${url}">
                        <button type="button" class="btn btn-outline-secondary btn-sm ml-1">
                            <i class="fab fa-github mr-1"></i>
                            <span>Code</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
        `;
	}
}
