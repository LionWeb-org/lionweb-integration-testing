import {assertEquals} from "./deps.ts"
import {readFileAsJson} from "../../repos/lioncore-typescript/src-utils/json.ts"
import {sortSerialization} from "../../repos/lioncore-typescript/src-utils/serialization-utils.ts"
import {deserializeLanguage} from "../../repos/lioncore-typescript/src/m3/deserializer.ts"
import {SerializationChunk} from "../../repos/lioncore-typescript/src/serialization.ts"
import {fromRoot, pathOfSerialization} from "./config.ts"


Deno.test("M3 instances (Deno)", async (tctx) => {

    await tctx.step("check whether Java serialization of LIonCore/M3 deserializes in TypeScript impl. (no assertions)", async () => {
        const serializationJava = await readFileAsJson(fromRoot(pathOfSerialization("m3", "Java")))
        /* const deserializationJava = */ deserializeLanguage(serializationJava as SerializationChunk)
    })

    await tctx.step("check whether Java and TypeScript serializations match", async () => {
        const serializationJava = await readFileAsJson(fromRoot(pathOfSerialization("m3", "Java"))) as SerializationChunk
        const serializationTypeScript = await readFileAsJson(fromRoot(pathOfSerialization("m3", "TypeScript"))) as SerializationChunk
        assertEquals(sortSerialization(serializationJava), sortSerialization(serializationTypeScript))
    })

})

