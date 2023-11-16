import { maxBy, minBy, pipe } from "remeda";
import { prisma } from "./prisma";

const groupPeopleByScore = async () => {
	return await prisma.starRating.groupBy({
		by: ['userId'],
		_avg: {
			score: true
		},
		orderBy: {
			_avg: {
				score: "asc"
				// if I am going to use minBy or maxBy, is it pointless to use orderBy ?
			}
		},



		// take: 1
	})
}

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`
// find the critic with the lowest average score
export const findTheGrumpiestCriticId = () => {
	return groupPeopleByScore().then((result) => minBy(result, (item) => item._avg.score)?.userId);
	// return groupPeopleByScore().then((result) => pipe(result, minBy((item) => item._avg.score))?.userId);
}


// find the critic with the highest average score
export const findTheNicestCriticId = () => {
	return groupPeopleByScore().then((result) => result[result.length - 1].userId)
};
