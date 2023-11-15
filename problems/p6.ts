import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
	const moviesWatched = await prisma.user.findUnique({
		where: {
			id: userId
		},
		include: {
			starRatings: {
				include: {
					movie: true,
				},
				orderBy: {
					movieId: 'asc'
				}
			}
		}
	})
	// return moviesWatched.map((item) => item.starRatings.map((item2) => item2.movie))
	console.log(moviesWatched?.starRatings.map((item) => item.movie))
	return moviesWatched?.starRatings.map((item) => item.movie)
};
