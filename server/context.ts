import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

export function createContext({ req, res }: CreateExpressContextOptions) {
    return {
        req,
        res,
        isAdmin: false, // change to true to test adminProcedure
    }
}
