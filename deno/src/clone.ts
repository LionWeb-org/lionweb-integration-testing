import {exec} from "./deps.ts"


const repos = {
    Org: "organization",
    Java: "lioncore-java",
    MPS: "lioncore-mps",
    OpenAPI: "lioncore-openapi",
    TypeScript: "lioncore-typescript"
} as const

const branch = "main"
const reposDir = "repos"

const token = Deno.env.get("LIONWEB_PAT")


const cloneRepo = (name: string, repoId: string) => {
    const message = `"${branch}" branch of ${name}-repo "${repoId}"`
    console.log(`Cloning ${message}...`)
    const localRepoDir = `${reposDir}/${repoId}`
    const url = `https://${token === undefined ? "" : `${token}@`}github.com/LIonWeb-org/${repoId}`
    return exec(`rm -rf ${localRepoDir}`)
        .then(() => exec(`npx tiged --mode=git --force ${url} -b ${branch} ${localRepoDir}`))
        .then(() => {
            console.log(`...done cloning ${message}`)
        })
}


Promise.all(
        Object.entries(repos)
            .map(([name, id]) => cloneRepo(name, id))
    )
    .then(() => {
        console.log(`\nDone cloning all LIonWeb repositories.`)
    })

