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
		this.info = [this.name, this.url, this.desc, this.modalNumber];
		this.view.setInfo(this.info);
	}
}

class GithubApiView {
	constructor() {
		this.portfolioContainer = document.getElementById("portfolioContainer");
		this.portfolioModals = document.getElementById("portfolioModals");
	}

	// Set the info array as arguments to the renderer method.
	setInfo(info) {
		this.info = info;
		// this.info = [this.name, this.url, this.desc, this.modalNumber];
		if (this.info[2] === null) {
			this.info[2] = "";
		}

		this.renderPortfolioGrid(this.info[0], this.info[1], this.info[3]);
		this.renderPortfolioModal(this.info[0], this.info[1], this.info[2], this.info[3]);
	}

	// Render portfolio component after the last child of main container.
	renderPortfolioGrid(name, url, modal) {
		this.portfolioContainer.insertAdjacentHTML("beforeend", this.portfolioTemplate(name, url, modal));
	}

	// Render portfolio modal component after the last child of main container.
	renderPortfolioModal(name, url, desc, modal) {
		this.portfolioModals.insertAdjacentHTML("beforeend", this.portfolioModalTemplate(name, url, desc, modal));
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
                    <img class="img-fluid" src="dist/assets/img/portfolio/${name}.png"
                        onerror="this.onerror=null; this.src='https://via.placeholder.com/356x245/505050/FED136?text=${name}';"
                        alt="${name} project thumbnail" />
                </a>

                <div class="portfolio-caption">
                    <div class="portfolio-caption-heading mb-2">${name}</div>
                    <a target="_blank" href="/${name}">
                        <button type="button" class="btn btn-outline-primary btn-sm">
                            <i class="far fa-window-restore mr-1"></i>
                            <span>View</span>
                        </button></a>

                    <a target="_blank" rel=”noopener noreferrer” href="${url}">
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

	// Portfolio modal component template.
	portfolioModalTemplate(name, url, desc, modal) {
		return `
        <div class="portfolio-modal modal fade" id="portfolioModal${modal}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-dismiss="modal"><img src="dist/assets/img/close-icon.svg" alt="Close modal" /></div>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="modal-body">
                                    <!-- Project Details Go Here-->
                                    <h2 class="text-uppercase mb-3">${name}</h2>
                                    <img class="img-fluid d-block mx-auto" src="dist/assets/img/portfolio/${name}.png"
                                        onerror="this.onerror=null; this.src='https://via.placeholder.com/356x245/505050/FED136?text=${name}';"
                                        alt="${name} project thumbnail" />
                                    <p>${desc}</p>
                                    
                                    <div class="portfolio-caption">
                                        <a target="_blank" href="/${name}">
                                            <button type="button" class="btn btn-outline-primary btn-sm">
                                                <i class="far fa-window-restore mr-1"></i>
                                                <span>View</span>
                                            </button></a>
                                        <a target="_blank" rel=”noopener noreferrer” href="${url}">
                                            <button type="button" class="btn btn-outline-secondary btn-sm ml-1">
                                                <i class="fab fa-github mr-1"></i>
                                                <span>Code</span>
                                            </button></a>
                                        <button class="btn btn-danger btn-sm ml-1" data-dismiss="modal" type="button">
                                            <i class="fas fa-times mr-1"></i>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
	}
}

// GitHub Repositories Components to Render in Portfolio Section.
const getApi = new GetApi();

getApi.getInfo("vue-weather");
getApi.getInfo("to-do-app");
getApi.getInfo("tip-calculator");
