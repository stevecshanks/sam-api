.PHONY: dev .env
dev: node_modules
	npm run start

.PHONY: deploy
deploy: website-bucket .env
	npm ci
	npm run build
	aws s3 cp build s3://sam-api.stevecshanks.dev --recursive --acl public-read

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

.PHONY: website-bucket
website-bucket:
	aws cloudformation deploy \
		--stack-name sam-api-website-bucket \
		--template-file website_s3_bucket.yaml

.env:
	aws cloudformation describe-stacks \
		--stack-name sam-api \
		--query "Stacks[0].Outputs" | npm run generate-env
