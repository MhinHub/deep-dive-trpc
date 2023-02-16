import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';


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

