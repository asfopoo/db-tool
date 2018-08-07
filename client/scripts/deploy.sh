#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
PARENT_DIR="$(dirname "$DIR")"
BUNDLE_PATH="$PARENT_DIR/dist/"

scp -i ~/.OtherKeys/admin.pub -r "$BUNDLE_PATH" user@10.10.1.208:~/production