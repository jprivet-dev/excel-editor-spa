#!/usr/bin/env bash

# Bug in Konsole (KDE): this line closes the current tab on an error in the script.
#set -e +o pipefail

# Usage:
# $ . scripts/reporter.sh

SPLIT="——————————————————————————————————————————————————————————————————————"
F_RESET="\033[0m"
C_RED="\033[31m"
C_BLUE="\033[34m"
C_GREEN="\033[32m"
C_YELLOW="\033[33m"
C_LIGHT_YELLOW="\033[93m"
ENCODE_SPACE="+"
ENCODE_SHARP="%23"
ENCODE_NEW_LINE="%0A"

current_remote_origin_url=$(git config remote.origin.url)
current_remote_origin_url_last_element=${current_remote_origin_url##*@}         # get the string after '@'
current_github_project="https://${current_remote_origin_url_last_element/:/\/}" # change ':' by '/'
current_github_project="${current_github_project/.git/}"                        # remove '.git'

step=0

CODACY_PROJECT_COVERAGE_TAB=https://app.codacy.com/gh/jprivet-dev/excel-editor-spa/settings/coverage
CODACY_PROJECT_TOKEN_FILE=./scripts/CODACY_PROJECT_TOKEN.sh
COVERAGE_FILE=./coverage/lcov/lcov.info

prompt_yes_no_choice=""

function prompt_yes_no() {
  local YES="yes"
  local YES_SHORT="y"
  local NO="no"
  local NO_SHORT="n"

  local choice=""
  local label=$1
  local default=$2

  prompt_yes_no_choice=""

  case $default in
  "${YES}" | "${YES_SHORT}") default="${YES}" ;;
  "${NO}" | "${NO_SHORT}") default="${NO}" ;;
  *) default="${YES}" ;;
  esac

  while true; do
    echo -e -n "${C_GREEN}> ${label}? (yes/no) ${C_LIGHT_YELLOW}[${default}]${F_RESET} "

    exec </dev/tty
    read choice

    if [[ "${default}" =~ (""|"${YES}"|"${YES_SHORT}"|"${NO}"|"${NO_SHORT}") ]]; then
      break
    fi
  done

  case $choice in
  "${YES}" | "${YES_SHORT}") choice="${YES}" ;;
  "${NO}" | "${NO_SHORT}") choice="${NO}" ;;
  *) choice="${default}" ;;
  esac

  prompt_yes_no_choice="${choice}"
}

prompt_response=""

function prompt() {
  local label=$1
  local example=$2
  local default=$3

  local complete_label="${C_GREEN}> ${label}"
  if [ "${example}" != "" ]; then
    complete_label+=" (e.g. ${C_LIGHT_YELLOW}${example}${C_GREEN})"
  fi
  complete_label+=":"
  if [ "${default}" != "" ]; then
    complete_label+=" ${C_LIGHT_YELLOW}[${default}]"
  fi
  complete_label+="${F_RESET} "

  while true; do
    echo -e -n "${complete_label}"

    exec </dev/tty
    read text

    if [ "${text}" == "" -a "${default}" != "" ]; then
      text="${default}"
    fi

    if [ "${text}" != "" ]; then
      prompt_response="${text}"
      break
    fi
  done
}

function git_get_current_branch() {
  git rev-parse --abbrev-ref HEAD 2>/dev/null
}

function git_status_modified_count() {
  git status --porcelain | grep '^[MA]' | wc -l 2>/dev/null
}

current_branch=$(gx_git_get_current_branch)

echo -e "${C_BLUE}----------------------------${F_RESET}"
echo -e "${C_BLUE}- CODACY COVERAGE REPORTER -${F_RESET}"
echo -e "${C_BLUE}-      [EXPERIMENTAL]      -${F_RESET}"
echo -e "${C_BLUE}----------------------------${F_RESET}"
echo

if [ -f "${CODACY_PROJECT_TOKEN_FILE}" ]; then
  source "${CODACY_PROJECT_TOKEN_FILE}"
else
  echo -e "${C_RED}ERROR! The file '${CODACY_PROJECT_TOKEN_FILE}' does not exist.${F_RESET}"
  return
fi

if [ "${CODACY_PROJECT_TOKEN}" == "" ]; then
  echo -e "${C_RED}ERROR! Define the API token CODACY_PROJECT_TOKEN.${F_RESET}"
  echo -e "${C_RED}@see ${CODACY_PROJECT_COVERAGE_TAB}.${F_RESET}"
  return
fi

echo "API token CODACY_PROJECT_TOKEN = ${CODACY_PROJECT_TOKEN}"

((step++))
echo
echo -e "${C_BLUE}${SPLIT}${F_RESET}"
echo -e "${C_BLUE}${step}. Generate code coverage on the current branch [${current_branch}]${F_RESET}"
echo
echo "$ make coverage"

prompt_yes_no "Run the above commands"
generate_code_coverage="${prompt_yes_no_choice}"

if [ "${generate_code_coverage}" == "yes" ]; then
  make coverage
fi

((step++))
echo
echo -e "${C_BLUE}${SPLIT}${F_RESET}"
echo -e "${C_BLUE}${step}. Commit generated files${F_RESET}"
echo

if [ ! -f ${COVERAGE_FILE} ]; then
  echo -e "${C_RED}ERROR! The file '${COVERAGE_FILE}' does not exist.${F_RESET}"
  return
fi

echo "$ git add ${COVERAGE_FILE}"
echo "$ git commit -m \"tests(codacy): save coverage reports in clover format\""
echo "$ git push origin ${current_branch}"

prompt_yes_no "Run the above commands"
commit_files="${prompt_yes_no_choice}"

if [ "${commit_files}" == "yes" ]; then
  git add "${COVERAGE_FILE}"

  if [ "$(git_status_modified_count)" == 0 ]; then
    echo -e "${C_RED}ERROR! No files to commit.${F_RESET}"
    return
  fi

  git commit -m "tests(codacy): save coverage reports in clover format" &&
    git push origin "${current_branch}"
fi

((step++))
echo
echo -e "${C_BLUE}${SPLIT}${F_RESET}"
echo -e "${C_BLUE}${step}. Upload the coverage reports '${COVERAGE_FILE}'${F_RESET}"
echo
echo "$ bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r ${COVERAGE_FILE}"

prompt_yes_no "Run the above commands"
upload_coverage_reports="${prompt_yes_no_choice}"

if [ "${upload_coverage_reports}" == "yes" ]; then
  bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r "${COVERAGE_FILE}"
fi

echo
echo -e "${C_BLUE}End!${F_RESET}"
echo

