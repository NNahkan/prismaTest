// I feel like .filter.reduce.map is not something you are going to like Jon ;/ i tried so hard but i couldn't find better way with 'include'
import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";

/* 
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
	const allStars = await prisma.starRating.groupBy({
		by: ['movieId'],
		having: {
			score: {
				_avg: {
					gt: n
				}
			}
		}

	})

	const movieIds = allStars.map((item) => item.movieId)

	const movies = await prisma.movie.findMany({
		where: {
			id: {
				in: movieIds,
			},
		},
	});
	return movies;
}
	 */

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {

	const movies = await prisma.movie.findMany({
		include: {
			starRatings: true
		}
	})

	return movies.filter((item) => {
		const avg = item.starRatings
			.reduce((acc, { score }) => acc + score, 0) / item.starRatings.length

		return avg > n
	})
		.map((item) => {
			const { starRatings, ...rest } = item;
			return rest
		})

};

