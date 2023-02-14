ORG=organization
TS=lioncore-typescript
JAVA=lioncore-java
MPS=lioncore-mps
OPEN_API=lioncore-openapi


REPOS_DIR=repos
function cloneRepo {
  REPO=$1
  BRANCH=${2:-main}
  echo "Cloning branch '$BRANCH' of repo '$1'..."
  LOCAL_REPO_DIR="repos/$REPO"
  rm -rf $LOCAL_REPO_DIR
  npx degit --mode=git --force "https://github.com/LIonWeb-org/$REPO" -b $BRANCH $LOCAL_REPO_DIR
  echo "...done"
  echo
}

cloneRepo $ORG
cloneRepo $JAVA
cloneRepo $MPS
cloneRepo $OPEN_API
cloneRepo $TS


(cd $REPOS_DIR/$TS ; deno task run-tests)

(cd $REPOS_DIR/$JAVA ; ./gradlew)

