import prisma from "./prisma";

const resetDb = async () => {
    await prisma.user.deleteMany();
    await prisma.friendRequest.deleteMany();
    await prisma.connectedFriend.deleteMany();
    await prisma.message.deleteMany();
    await prisma.room.deleteMany();
}
resetDb();