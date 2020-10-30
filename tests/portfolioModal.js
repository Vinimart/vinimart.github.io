// End to End Tests with Cypress
// Portfolio Modal Component
describe("Check Portfolio Modal", () => {
	it("Visit", () => {
		cy.visit("/");
	});

	it("Check visibility", () => {
        cy.get("#portfolioModal1")
            .should("not.be.visible");
	});

	it("Check click", () => {
        cy.get(":nth-child(1) > .portfolio-item > .portfolio-link")
            .click();
        cy.get("#portfolioModal1")
            .should("be.visible");
	});
});