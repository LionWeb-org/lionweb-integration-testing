import {exec} from "./deps.ts"


const repos = {
    Org: "organization",
    Java: "lioncore-java",
    MPS: "lioncore-mps",
    OpenAPI: "lioncore-openapi",
    TypeScript: "lioncore-typescript"
}

const branch = "main"
const reposDir = "repos"

const token = Deno.env.get("LIONWEB_PAT")

for await (const [name, id] of Object.entries(repos)) {
    console.log(`Cloning "${branch}" branch of ${name}-repo "${id}"...`)
    const localRepoDir = `${reposDir}/${id}`
    await exec(`rm -rf ${localRepoDir}`)
    const url = `https://${token === undefined ? "" : `${token}@`}github.com/LIonWeb-org/${id}`
    await exec(`npx tiged --mode=git --force ${url} -b ${branch} ${localRepoDir}`)
    console.log(`...done`)
    console.log()
}

