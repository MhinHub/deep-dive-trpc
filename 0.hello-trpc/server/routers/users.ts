import { t } from "../trpc";
import { z } from "zod";

const userProcedure = t.procedure.input(z.object({
    id: z.number(),
    name: z.string()
}))

export const usersRouter = t.router({
    //? without zod
    // getUser: t.procedure.query(() => {  
    //     return {
    //         id: 1,
    //         name: "John Doe"
    //     }
    // })

    get: userProcedure.query(({ input }) => {
        return {
            id: input.id,
            name: input.name
        }
    }),

    update: userProcedure
        .input(z.object({
            job: z.string(),
            status: z.string()
        }))
        .output(z.object({  // output is optional : use it if you want to return a specific type & just return the input declared
            id: z.number(),
            name: z.string(),
            job: z.string().optional()
        }))
        .mutation(({ input }) => {
            return {
                id: input.id,
                name: input.name,
                job: input.job,
                status: input.status
            }
        })
})