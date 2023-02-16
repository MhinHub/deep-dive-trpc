import { t } from "../trpc"

export const usersRouter = t.router({
    getUser: t.procedure.query(() => {
        return {
            id: 1,
            name: "John Doe"
        }
    })
})