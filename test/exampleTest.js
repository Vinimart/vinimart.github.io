import chai from "chai";
const assert = chai.assert;
import { app } from "../hellofunc.js";

describe("App", () => {
	it("App should return hello", () => {
		assert.equal(app(), "Hello!!");
	});
});
