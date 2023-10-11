# LionWeb integration testing

Automated tests that check that the other repos within the [LionWeb GitHub](https://github.com/LionWeb-io) integrate well and consistently with each other.

Kick off all the tests by running the following command on the CLI:

```
$ ./clone.sh
$ ./test.sh
```

The first command clones all the other LionWeb repositories.
The second command runs the integration test suite which is implemented in Deno.
The same commands are run as a GitHub Action named "LionWeb integration tests".
The integration tests do not run the automated tests in the other repositories.


## Installation requirements

* [Deno](https://deno.land/), currently (at least) version 1.30.3 - both for the integration tests written in Deno in [`deno/`](./deno/), and for those in the [`lioncore-typescript` repo](./repos/lioncore-typescript).
* Java 11 (but really Java 8) - for the [`lioncore-java` repo](./repos/lioncore-java).

