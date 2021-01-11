.PHONY: dev
dev: node_modules
	npm run start

.PHONY: test
test: node_modules typecheck
	CI=true npm test

.PHONY: lint
lint: node_modules
	npm run lint

.PHONY: typecheck
typecheck: 
	npm run typecheck

node_modules: package.json
	npm install
	touch -m $@
