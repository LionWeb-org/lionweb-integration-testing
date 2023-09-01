#!/bin/sh -e

deno task run-tests

npx ajv -c ajv-formats --spec=draft2020 --strict=true --allErrors=true --allowUnionTypes=true test -s repos/lioncore-typescript/schemas/lioncore.serialization.schema.json -d repos/lioncore-java/core/src/test/resources/serialization/lioncore.json --valid

