import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";
// donup bakacagim

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
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
	console.log(movies)
	return movies;
};
