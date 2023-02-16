import { t } from "../trpc"

export const appRouter = t.router({
    sayHello: t.procedure.query(() => {
        return "Hello tRPC!"
    }),
    log: t.procedure
        .input((input) => {
            if (typeof input === "string") return input

            throw new Error("Invalid input: Expected string")
        })
        .mutation(req => {
            console.log(req.input) // log in server console
            return true + " Logged"
        })
})