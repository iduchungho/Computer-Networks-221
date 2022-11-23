import prisma from "../../utils/prisma";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import * as argon2 from 'argon2';
export const registerService = async (input : RegisterUserInput) => {
    const { email, password, username } = input;
    // Check if user already exists
    const foundUser = await prisma.user.findUnique({
        where : {
            email,
        }
    });
    if(foundUser) {
        return null;
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
        select : {
            id : true,
            username : true,
            email : true,
        }
    });
    return newUser;
};

export const loginService = async (input : LoginUserInput) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select : {
            id : true,
            username : true,
            email : true,
            password : true,
        }
    });
    if(user && await argon2.verify(user.password, password)){
        const { password, ...rest } = user;
        return rest;
    }
    return null;
}
export const searchFriendsService = async (friendName : string, userId : string) => {
    const friends = await prisma.user.findMany({
        where : {
            username : {
                contains : friendName,
                mode : 'insensitive',
            }
        },
        select : {
            id : true,
            username : true,
            email : true,
        }
    });
    // exclude connect friend 
    const connectedFriends = await getFriendsService(userId);
    const filteredFriends = friends.filter(friend => {
        const isFriend = connectedFriends.find(connectedFriend => connectedFriend?.id === friend.id);
        return !isFriend;
    });
    return filteredFriends;
}

export const getFriendsIdSupport = async (userId : string) => {
    const friends = await prisma.connectedFriend.findMany({
        where : {
            userId : userId,
        },
        select : {
            friendId : true,
        }
    })
    return friends;
}
export const getUserById = async (userId : string) => {
    const user = await prisma.user.findUnique({
        where : {
            id : userId,
        },
        select : {
            id : true,
            username : true,
            email : true,
        }
    });
    return user;
}

export const requestFriendService = async (userId : string, friendId : string) => {
    // check if friend is already connected
    const foundConnected1 = await prisma.connectedFriend.findFirst({
        where : {
            userId : userId,
            friendId : friendId,
        }
    })
    const foundConnected2 = await prisma.connectedFriend.findFirst({
        where : {
            userId : friendId,
            friendId : userId,
        }
    })
    if(foundConnected1 || foundConnected2) {
        return {
            success : false,
            message : 'Friend is already connected',
        }
    }
    // check if friend request is already sent
    const foundRequest = await prisma.friendRequest.findFirst({
        where : {
            senderId : userId,
            receiverId : friendId,
        }
    })
    if(foundRequest) {
        return {
            success : false,
            message : 'Friend request is already sent',
        }
    }
    await prisma.friendRequest.create({
        data : {
            senderId : userId,
            receiverId : friendId,
        },
        select : {
            senderId : true,
            receiverId : true,
        }
    });
    return {
        success : true,
        message : 'Friend request sent',
    }
}

export const acceptFriendService = async (userId : string, friendId : string) => {
    const request = await prisma.friendRequest.findFirst({
        where : {
            senderId : friendId,
            receiverId : userId,
        }
    });
    if(request){
        await prisma.friendRequest.delete({
            where : {
                id : request.id,
            }
        });
        await prisma.connectedFriend.create({
            data : {
                userId,
                friendId,
            }
        });
        await prisma.connectedFriend.create({
            data : {
                userId : friendId,
                friendId : userId,
            }
        });
        return {
            success : true,
            message : 'Friend request accepted',
        };
    }
    return {
        success : false,
        message : 'Friend request not found',
    };
}

export const rejectFriendService = async (userId : string, friendId : string) => {
    const request = await prisma.friendRequest.findFirst({
        where : {
            senderId : friendId,
            receiverId : userId,
        }
    });
    if(request){
        await prisma.friendRequest.delete({
            where : {
                id : request.id,
            }
        });
        return {
            success : true,
            message : 'Friend request rejected',
        }
    }
    return {
        success : false,
        message : 'Friend request not found',
    };
}

export const deleteFriendService = async (userId : string, friendId : string) => {
    const connectedFriend1 = await prisma.connectedFriend.findFirst({
        where : {
            userId,
            friendId,
        }
    });
    const connectedFriend2 = await prisma.connectedFriend.findFirst({
        where : {
            userId : friendId,
            friendId : userId,
        }
    });
    if(connectedFriend1 && connectedFriend2){
        await prisma.connectedFriend.delete({
            where : {
                id : connectedFriend1.id,
            }
        });
        await prisma.connectedFriend.delete({
            where : {
                id : connectedFriend2.id,
            }
        });
        return {
            success : true,
            message : 'Friend deleted',
        };
    }
    return {
        success : false,
        message : 'Friend not found',
    };
}

export const getFriendsService = async (userId : string) => {
    const friendsId = await getFriendsIdSupport(userId);
    const friends : any[] = [];
    for(let i = 0; i < friendsId.length; i++){
        const friend = await getUserById(friendsId[i].friendId);
        friends.push(friend);
    }
    return friends;
}
export const getPendingRequestService = async (userId : string) => {
    const requests = await prisma.friendRequest.findMany({
        where : {
            receiverId : userId,
        },
        select : {
            senderId : true,
        }
    });

    const senders :any [] = [];
    for(let i = 0; i < requests.length; i++){
        const sender = await getUserById(requests[i].senderId);
        senders.push(sender);
    }
    return senders;
}