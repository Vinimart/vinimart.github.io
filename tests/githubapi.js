// End to End Tests with Cypress

describe("Check Portfolio Modal", () => {
	it("Check visibility", () => {
		cy.visit("/");
        cy.get(":nth-child(1) > .portfolio-item > .portfolio-link > .portfolio-hover")
            .should("not.be.visible");
    });
    
    it("Check click", () => {
        cy.visit("/");
        cy.get(":nth-child(1) > .portfolio-item > .portfolio-link > .portfolio-hover")
            .click().should("be.visible");
    })
});
