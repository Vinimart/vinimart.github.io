import { userName, gitHubToken } from "../js/gitHubToken";
// const token = require("../js/gitHubToken");

describe("Check if its string", () => {
	it("user should be string", () => {
		expect(userName).toBe("Vinimart");
	});

	it("token should be string", () => {
		expect(gitHubToken).toEqual(jasmine.any(String));
	});
});
