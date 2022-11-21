import {z} from 'zod';
const userCore = {
    email : z.string({
        required_error: 'Email is required',
    }).email({
        message: 'Email is not valid',
    }),
    password : z.string({
        required_error: 'Password is required',
    }).min(6, {
        message: 'Password must be at least 6 characters',
    })
}

export const registerUserSchema = z.object({
    ...userCore,
    confirmPassword : z.string({
        required_error: 'Confirm Password is required',
    }).min(6, {
        message: 'Confirm Password must be at least 6 characters',
    }),
    username : z.string({
        required_error: 'Username is required',
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
});

export const loginUserSchema = z.object({
    ...userCore,
})
export const friendIdSchema = z.object({
    friendId : z.string({
        required_error: 'Friend Id is required',
    }),
});
export const friendNameSchema = z.object({
    friendName : z.string({
        required_error: 'Friend Name is required',
    }),
});
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type FriendIdInput = z.infer<typeof friendIdSchema>;
export type FriendNameInput = z.infer<typeof friendNameSchema>;