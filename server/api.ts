import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

const t = initTRPC.create()


const appRouter = t.router({
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

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({
    router: appRouter
}))


const port = 3000;
app.listen(port, () => {
    console.log("Server started on port " + port)
})

export type AppRouter = typeof appRouter;

