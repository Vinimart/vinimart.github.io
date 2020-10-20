class GetApi {
	constructor() {
		this.view = new GithubApiView();
	}

	async githubFetch(repo) {
        const response = await fetch(`https://api.github.com/repos/Vinimart/${repo}`);
        
		if (response.status === 200) {
			const data = await response.json();
			this.setResults(data);
		} else {
			console.error(`Could not find "${repo}" repository. Request status: ${response.status}`);
		}
	}

	setResults(data) {
		this.data = data;
		this.url = this.data.svn_url;
		this.name = this.data.name;
		this.desc = this.data.description;
		this.info = [this.url, this.name, this.desc];

		this.view.setInfo(this.info);
	}
}

class GithubApiView {
	constructor() {
		this.portfolioContainer = document.getElementById("portfolioContainer");
	}

	getInfo(repo) {
		this.getApi = new GetApi();

		if (repo) {
			return this.getApi.githubFetch(repo);
		} else {
			return console.error("Please insert a valid repository name as argument for getInfo method.");
		}
	}

	setInfo(info) {
		this.info = info;
		this.renderPortfolioGrid(this.info[1], this.info[0]);
	}

	portfolioTemplate(name, url) {
		return `
        <div class="col-lg-4 col-sm-6 mb-4">
            <div class="portfolio-item">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
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

	renderPortfolioGrid(name, url) {
		this.portfolioContainer.insertAdjacentHTML("beforeend", this.portfolioTemplate(name, url));
	}
}
