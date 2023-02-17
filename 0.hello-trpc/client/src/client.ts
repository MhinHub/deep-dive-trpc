import { AppRouter } from './../../server/api';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

const client = createTRPCProxyClient<AppRouter>({
    links: [
        // loggerLink(), //? used to log queries and mutations
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

    const res3 = await client.users.get.query({
        id: 1,
        name: "John Doe"
    })
    console.log("Nested query: ", res3)

    const res4 = await client.users.update.mutate({
        id: 1,
        name: "Ashiaap man",
        job: "Programmer",
        status: "Single"
    })
    console.log("Nested mutation: ", res4)

    const res5 = await client.secretData.query() // Error: UNAUTHORIZED \\ change isAdmin to true in context.ts
    console.log("Admin query: ", res5)

}

main()