#!/usr/bin/env bash

# Load aliases:
# $ . .bash_aliases

HAS_DOCKER_COMP_PLUGIN=$(docker compose version 2> /dev/null)

if [ "${HAS_DOCKER_COMP_PLUGIN}" != "" ]; then
	DOCKER_COMP_BASE="docker compose"
else
	DOCKER_COMP_BASE="docker-compose"
fi

alias node="${DOCKER_COMP_BASE} exec --user 1000:1000 node node"
alias npm="${DOCKER_COMP_BASE} exec --user 1000:1000 node npm"
alias ng="${DOCKER_COMP_BASE} exec --user 1000:1000 node ng"

echo -e '\033[1;42m Aliases loaded: node, npm, ng \033[0m'
