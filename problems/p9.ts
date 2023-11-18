import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
	await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			username: newUsername
		}
	}
	)
};
