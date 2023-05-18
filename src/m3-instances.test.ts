import {assertEquals, fail} from "./deps.ts"
import {
    readFileAsJson
} from "../../repos/lioncore-typescript/src-test/utils/json.ts"
import {
    deserializeMetamodel
} from "../../repos/lioncore-typescript/src/m3/deserializer.ts"
import {
    SerializedModel
} from "../../repos/lioncore-typescript/src/serialization.ts"
import {
    createJsonValidatorForSchema
} from "./utils/json-validator.ts"
import {fromRoot, pathOfSchema, pathOfSerialization} from "./config.ts"


Deno.test("M3 instances (Deno)", async (tctx) => {

    await tctx.step("check whether Java serialization of LIonCore/M3 validates against JSON Schema", async () => {
        const serializationJava = await readFileAsJson(fromRoot(pathOfSerialization("m3", "Java")))
        const lioncoreSchema = await readFileAsJson(fromRoot(pathOfSchema("m3")))
        const validator = createJsonValidatorForSchema(lioncoreSchema)
        const errors = validator(serializationJava)
        if (errors.length > 0) {
            const take = 10
            const more = Math.max(errors.length - take, 0)
            console.dir([
                ...errors.slice(0, take),
                ...(more > 0 ? [`${more} more validation error${more > 1 ? "s" : ""}...`] : [])
            ])
            fail("Java serialization of LIonCore/M3 self-definition doesn't validate against JSON Schema")
        }
    })

    await tctx.step("check whether Java serialization of LIonCore/M3 deserializes in TypeScript impl. (no assertions)", async () => {
        const serializationJava = await readFileAsJson(fromRoot(pathOfSerialization("m3", "Java")))
        /* const deserializationJava = */ deserializeMetamodel(serializationJava as SerializedModel)
    })

    await tctx.step("check whether Java and TypeScript serializations match", async () => {
        const serializationJava = await readFileAsJson(fromRoot(pathOfSerialization("m3", "Java")))
        const serializationTypeScript = await readFileAsJson(fromRoot(pathOfSerialization("m3", "TypeScript")))
        assertEquals(serializationJava, serializationTypeScript)
    })

})

