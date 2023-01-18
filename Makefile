MAKE_S 		= $(MAKE) -s
USER_ID 	= $(shell id -u)
GROUP_ID 	= $(shell id -g)

# Executables (local)
HAS_DOCKER_COMP_PLUGIN := $(shell docker compose version 2> /dev/null)
ifdef HAS_DOCKER_COMP_PLUGIN
	DOCKER_COMP_BASE = docker compose
else
	DOCKER_COMP_BASE = docker-compose
endif

DOCKER_COMP = $(DOCKER_COMP_BASE)

# Docker containers
NODE_CONT = $(DOCKER_COMP) exec node

# Executables
NPM		= $(NODE_CONT) npm
NG 		= $(NODE_CONT) ng

## — ✨ 🚀 THE ANGULAR DOCKER MAKEFILE 🚀 ✨ ——————————————————————————————————

.DEFAULT_GOAL := help
.PHONY: help
help: ## Print self-documented Makefile
	@grep -E '(^[.a-zA-Z_-]+[^:]+:.*##.*?$$)|(^#{2})' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = "## "}; \
		{ \
			split($$1, command, ":"); \
			target=command[1]; \
			description=$$2; \
			# --- space --- \
			if (target=="##") \
				printf "\033[33m%s\n", ""; \
			# --- title --- \
			else if (target=="" && description!="") \
				printf "\033[33m\n%s\n", description; \
			# --- command + description --- \
			else if (target!="" && description!="") \
				printf "\033[32m  %-30s \033[0m%s\n", target, description; \
			# --- do nothing --- \
			else \
				; \
		}'
	@echo

## — DOCKER 🐳 ————————————————————————————————————————————————————————————————

.PHONY: build
build: ## Build the first time or rebuild fresh images if necessary
	$(DOCKER_COMP) build --pull --no-cache

.PHONY: up
up: ## Create and start containers
	$(DOCKER_COMP) up --remove-orphans

.PHONY: detach
detach: ## Create and start containers in detached mode (no logs)
	$(DOCKER_COMP) up --remove-orphans --detach

.PHONY: down
down: ## Stop and remove containers, networks
	$(DOCKER_COMP) down --remove-orphans

.PHONY: logs
logs: ## Show live logs
	$(DOCKER_COMP) logs --tail=0 --follow

##

.PHONY: install
install: build up ## Build & Start

.PHONY: start
start: up ## 'up' alias

.PHONY: stop
stop: down ## 'down' alias

.PHONY: stop_all
stop_all: ## Stop all projects running containers without removing them
	docker stop $$(docker ps -a -q)

## — ANGULAR 🛡 ———————————————————————————————————————————————————————————————

.PHONY: npm
npm: ## Run npm, pass the parameter "c=" to run a given command, example: make ng c=--version
	@$(eval c ?=)
	$(NPM) $(c)

.PHONY: ng
ng: ## Run ng, pass the parameter "c=" to run a given command, example: make ng c=version
	@$(eval c ?=)
	$(NG) $(c)

.PHONY: install_latest_cli
install_latest_cli: ## Install the latest version of Angular CLI
	$(NPM) install --save-dev @angular/cli@latest

.PHONY: bash
bash: ## Connect to the Node container (current user).
	$(DOCKER_COMP) exec --user $(USER_ID):$(GROUP_ID) node bash

bash@root: ## Connect to the Node container (root).
	$(DOCKER_COMP) exec --user 0 node bash
