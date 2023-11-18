import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {

	const usersIdToDelete = await prisma.user.findMany({
		where: {
			age: {
				lt: n
			}
		},
		select: {
			id: true
		}
	}).then((result) => result.map((item) => item.id))


	const deleteUsers = prisma.user.deleteMany({
		where: {
			id: {
				in: usersIdToDelete
			}
		}
	})


	const deleteStarRating = prisma.starRating.deleteMany({
		where: {
			userId: {
				in: usersIdToDelete
			}
		}
	})

	await prisma.$transaction([deleteStarRating, deleteUsers])
};

