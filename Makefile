PYTHON = .python.installed

.PHONY: dev
dev:
	sam local start-api

.PHONY: deploy
deploy:
	sam deploy --no-fail-on-empty-changeset

.PHONY: test
test: .venv
	.venv/bin/pytest

.PHONY: lint
lint: .venv
	.venv/bin/black --check .

.PHONY: clean
clean:
	rm -f $(PYTHON)
	rm -rf .venv

.PHONY: deploy-user
deploy-user:
	aws cloudformation deploy \
		--stack-name sam-api-deploy-user \
		--template-file deployment_iam_user.yaml \
		--capabilities CAPABILITY_NAMED_IAM

.venv: .venv/bin/pip hello_world/requirements-dev.txt
	.venv/bin/pip install -r hello_world/requirements-dev.txt
	touch -m $@

.venv/bin/pip: $(PYTHON)
	python -m venv .venv

$(PYTHON):
	(pyenv versions | grep -q $(shell cat .python-version)) || pyenv install $(shell cat .python-version)
	touch -m $(PYTHON)
