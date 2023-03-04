# LIonWeb integration testing

Automated tests that check that the other repos within the [LIonWeb GitHub](https://github.com/LIonWeb-org) integrate well and consistently with each other.

Kick off all the tests by running the following command on the CLI:

```
$ ./clone.sh
$ cd deno && deno task run-tests
```

The first command clones (using [`tiged`](https://github.com/tiged/tiged) &lrarr; `degit` = “de-Git”) all the other LIonWeb repositories.
The second command runs the integration test suite which is implemented in Deno.
The same commands are run as a GitHub Action named "LIonWeb integration tests".
The integration tests do not run the automated tests in the other repositories.


## Installation requirements

* [Deno](https://deno.land/), currently (at least) version 1.30.3 - both for the integration tests written in Deno in [`deno/`](./deno/), and for those in the [`lioncore-typescript` repo](./repos/lioncore-typescript).
* Java 11 (but really Java 8) - for the [`lioncore-java` repo](./repos/lioncore-java).

