const chai = require("chai");
const githubInit = require("../js/githubInit");

describe("githubInit", () => {
	it("repositories should be a array", () => {
		chai.assert.typeOf(githubInit, "array");
	});
});
