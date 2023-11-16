/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { findTheGrumpiestCriticId, findTheNicestCriticId } from "./p8";

describe("p7", () => {
	beforeEach(async () => {
		await clearDb();
	});

	it("findGrumpiestCriticId should be a function", () => {
		expect(findTheGrumpiestCriticId).toBeInstanceOf(Function);
	});

	it("should return Peter", async () => {
		const { users } = await seedFixtures();
		console.log("from test", users.peter.id)
		expect(await findTheGrumpiestCriticId()).toEqual(users.peter.id);
	});

	it("findTheNicestCriticId should be a function", async () => {
		expect(findTheNicestCriticId).toBeInstanceOf(Function);
	});

	it("the nicest critic should be andrey", async () => {
		const { users } = await seedFixtures();

		expect(await findTheNicestCriticId()).toEqual(users.andrey.id);
	});
});
