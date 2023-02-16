import { AppRouter } from './../../server/api';
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const client = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc",
        })
    ],
})

async function main() {
    const res = await client.sayHello.query()
    console.log("Query: ", res) // Hello tRPC!

    const res2 = await client.log.mutate("Hello") // log in client console
    console.log("Mutation: ", res2)

    const res3 = await client.users.getUser.query()
    console.log("Nested query: ", res3)
}

main()