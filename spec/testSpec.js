let year = 2019;

describe("Get year date", () => {
	// it("should be a number", () => {
	// 	year = parseInt(year);
	// 	expect(year).toBe(2019);
	// });

	beforeEach(() => {
		year += 1;
	});

	it("should be next year", () => {
		expect(year).toBe(2020);
	});

	it("should be in the next 2 years", () => {
		expect(year).toBe(2021);
	});
});
