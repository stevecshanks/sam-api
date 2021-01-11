SUBDIRS = api

.PHONY: deploy
deploy: $(SUBDIRS)

.PHONY: test
test: $(SUBDIRS)

.PHONY: lint
lint: $(SUBDIRS)

.PHONY: $(SUBDIRS)
$(SUBDIRS):
	$(MAKE) -C $@ $(MAKECMDGOALS)

.PHONY: deploy-user
deploy-user:
	aws cloudformation deploy \
		--stack-name sam-api-deploy-user \
		--template-file deployment_iam_user.yaml \
		--capabilities CAPABILITY_NAMED_IAM
