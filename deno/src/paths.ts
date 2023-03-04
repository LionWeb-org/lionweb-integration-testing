import {YamlLoader} from "./deps.ts"


const paths = await new YamlLoader().parseFile("../paths.yaml")
    // TODO  type-def. this?

export const pathOfSerialization = (kind: "m3", repo: "Java" | "TypeScript"): string =>
    (paths as any)["serializations"]
        .find((serialization: any) => serialization.kind === kind && serialization.repo === repo)!
        .path

export const pathOfSchema = (kind: "m3"): string =>
    (paths as any)["schemas"]
        .find((schema: any) => schema.kind === kind)!
        .path

export const fromRoot = (path: string): string =>
    `../repos/${path}`

