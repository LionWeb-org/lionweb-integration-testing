#!/bin/sh -e

deno task run-tests

# install AJV:
npm init -y
npm install ajv
npm install ajv-cli
npm install ajv-formats

# validate schema using AJV:
TS_LIONCORE_M3_SCHEMA=../repos/lionweb-typescript/packages/artifacts/schemas/lioncore_m3.serialization.schema.json
JAVA_LIONCORE_SERIALIZATION=../repos/lionweb-java/core/src/test/resources/serialization/lioncore.json
./node_modules/.bin/ajv -c ajv-formats --spec=draft2020 --strict=true --allErrors=true --allowUnionTypes=true test -s $TS_LIONCORE_M3_SCHEMA -d $JAVA_LIONCORE_SERIALIZATION --valid

