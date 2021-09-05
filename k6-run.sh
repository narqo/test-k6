#!/usr/bin/env bash

set -o errexit
set -o pipefail

: ${DOCKER:=docker}

# Refer to https://k6.io/docs/testing-guides/running-large-tests/
# for k6 performance tuning.

run() {
    local k6_flags="--discard-response-bodies"

    while getopts ":p" arg; do
    case "$arg" in
        p)
            k6_flags="${flags} --paused"
            ;;
    esac
    done
    shift $((OPTIND-1))

    $DOCKER container run --rm -i -v $PWD:/tmp -w /tmp -P loadimpact/k6 \
        --quiet \
        run \
        $k6_flags \
        --no-usage-report \
        --no-thresholds \
        --no-summary \
        --out json=/tmp/simple-out.json - <$1
}

run $*