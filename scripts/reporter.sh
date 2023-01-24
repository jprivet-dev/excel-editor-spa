#!/usr/bin/env bash

# Usage:
# $ . scripts/reporter.sh

printf "##############################\n"
printf "# CODACY - COVERAGE REPORTER #\n"
printf "##############################\n"

CODACY_PROJECT_TOKEN_FILE=./scripts/CODACY_PROJECT_TOKEN.sh
LCOV_INFO_FILE=./coverage/lcov/lcov.info

if [ -f "${CODACY_PROJECT_TOKEN_FILE}" ]; then
  source "${CODACY_PROJECT_TOKEN_FILE}"
fi

if [ "${CODACY_PROJECT_TOKEN}" == "" ]; then
  printf "ERROR! Define the API token CODACY_PROJECT_TOKEN.\n"
  printf "@see https://app.codacy.com/gh/jprivet-dev/excel-editor-spa/settings/coverage\n"
else
  printf "> API token CODACY_PROJECT_TOKEN = %s\n" "${CODACY_PROJECT_TOKEN}"
  printf "> Generate code coverage:\n"

  docker compose exec node ng test --no-watch --code-coverage
  git add "${LCOV_INFO_FILE}"
  git commit -m "tests(codacy): save coverage reports in lcov format"

  if [ -f ${LCOV_INFO_FILE} ]; then
    printf "> Upload the coverage reports '%s'\n" "${LCOV_INFO_FILE}"
    bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r "${LCOV_INFO_FILE}"
  else
    printf "ERROR! The file '%s' does not exist.\n" "${LCOV_INFO_FILE}"
  fi

  printf "> Update remote refs with '$ git push'.\n"
fi
