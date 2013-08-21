
# Group targets
all: deps lint test bundle

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@npm install

# Lint JavaScript
lint:
	@echo "Linting JavaScript..."
	@./node_modules/.bin/jshint \
		--config ./test/config/jshint.json \
		./{lib,test}/*

# Run all tests
test: test-unit

# Run unit tests
test-unit:
	@echo "Running unit tests..."
	@./node_modules/.bin/mocha \
		--reporter spec \
		--colors \
		--recursive \
		./test/unit

# Bundle the browser-ready JavaScript
bundle:
	@echo "Bundling JavaScript..."
	@mkdir -p ./build
	@./node_modules/.bin/browserify \
		--standalone binder \
		--outfile ./build/binder.js \
		./lib/binder.js
