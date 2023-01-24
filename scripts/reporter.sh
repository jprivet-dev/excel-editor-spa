#!/usr/bin/env bash

set -e +o pipefail

# Usage:
# $ . scripts/reporter.sh

function git_status_count() {
  git status --porcelain | grep '^[^? ]' | wc -l 2>/dev/null
}

printf "##############################\n"
printf "# CODACY - COVERAGE REPORTER #\n"
printf "##############################\n"

CODACY_PROJECT_COVERAGE_TAB=https://app.codacy.com/gh/jprivet-dev/excel-editor-spa/settings/coverage
CODACY_PROJECT_TOKEN_FILE=./scripts/CODACY_PROJECT_TOKEN.sh
LCOV_INFO_FILE=./coverage/lcov/lcov.info

if [ -f "${CODACY_PROJECT_TOKEN_FILE}" ]; then
  source "${CODACY_PROJECT_TOKEN_FILE}"
else
  printf "ERROR! The file '%s' does not exist.\n" "${CODACY_PROJECT_TOKEN_FILE}"
  return
fi

if [ "${CODACY_PROJECT_TOKEN}" == "" ]; then
  printf "ERROR! Define the API token CODACY_PROJECT_TOKEN.\n"
  printf "@see %s\n" "${CODACY_PROJECT_COVERAGE_TAB}"
  return
fi

printf "> API token CODACY_PROJECT_TOKEN = %s\n" "${CODACY_PROJECT_TOKEN}"
printf "> Generate code coverage:\n"

docker compose exec node ng test --no-watch --code-coverage

if [ "$(git_status_count)" == 0 ]; then
  printf "ERROR! No files to commit !\n"
  return
fi

git add "${LCOV_INFO_FILE}"
git commit -m "tests(codacy): save coverage reports in lcov format"

if [ ! -f ${LCOV_INFO_FILE} ]; then
  printf "ERROR! The file '%s' does not exist.\n" "${LCOV_INFO_FILE}"
  return
fi

printf "> Upload the coverage reports '%s'\n" "${LCOV_INFO_FILE}"
bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r "${LCOV_INFO_FILE}"

printf "> Update remote refs with '$ git push'.\n"
