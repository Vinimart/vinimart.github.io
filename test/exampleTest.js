const assert = require("chai").assert;
import { app } from "../hellofunc";

describe("App", () => {
	it("App should return hello", () => {
		assert.equal(app(), "Hello!!");
	});
});
