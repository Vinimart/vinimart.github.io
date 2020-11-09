import chai from "chai";
const assert = chai.assert;
import { userName, gitHubToken } from "../../js/gitHubToken.js";

describe("gitHubToken", () => {
	it("userName should be a string", () => {
		assert.typeOf(userName, "string");
    });
    
    it("gitHubToken should be a string", () => {
		assert.typeOf(gitHubToken, "string");
	});
});
