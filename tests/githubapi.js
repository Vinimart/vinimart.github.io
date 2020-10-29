// End to End Tests with Cypress

describe("Check Portfolio Modal", () => {
	it("Visit", () => {
		cy.visit("/");
	});

	it("Check visibility", () => {
        cy.get("#portfolioModal1 > .modal-dialog > .modal-content")
            .should("not.be.visible");
	});

	it("Check click", () => {
        cy.get(":nth-child(1) > .portfolio-item > .portfolio-link > .portfolio-hover")
            .click();
        cy.get("#portfolioModal1")
            .should("be.visible");
	});
});
