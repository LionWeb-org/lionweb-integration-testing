import {exec} from "./deps.ts"


const repos = {
    Org: "organization",
    Java: "lioncore-java",
    MPS: "lioncore-mps",
    OpenAPI: "lioncore-openapi",
    TypeScript: "lioncore-typescript"
} as const

const reposDir = "repos"

const token = Deno.env.get("LIONWEB_PAT")


const cloneRepo = (name: string, repoId: string) => {
    const localRepoDir = `${reposDir}/${repoId}`
    const url = `https://${token === undefined ? "" : `${token}@`}github.com/LIonWeb-org/${repoId}`
    return exec(`rm -rf ${localRepoDir}`)
        .then(() => exec(`git clone --depth 1 ${url} ${localRepoDir}`))
            // Note: Git exits silently on failure!
        .then(() => {
            console.log(`cloned ${name}-repo: ${repoId} -> ${localRepoDir}`)
        })
}
// TODO  error handling


Promise.all(
        Object.entries(repos)
            .map(([name, id]) => cloneRepo(name, id))
    )
    .then(() => {
        console.log(`\nDone cloning all LIonWeb repositories.`)
    })

