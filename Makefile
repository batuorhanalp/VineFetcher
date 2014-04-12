REPORTER = spec
TESTS = test/*.js test/**/*.js test/**/**/*.js

test:
	@NODE_ENV=test NODE_PATH=./app/controllers ./node_modules/.bin/mocha \
    --reporter $(REPORTER) \
    --ui tdd \
    $(TESTS)

testdebug:
	@NODE_ENV=test NODE_PATH=./app/controllers ./node_modules/.bin/mochaha debug \
		--reported $(REPORTER) \
		--ui bdd \
		$(TESTS)

.PHONY: test
