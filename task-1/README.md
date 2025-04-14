# Tag Parser

A PHP library for parsing custom tags with descriptions and data. The parser handles tags in the format `[TAG_NAME:description]data[/TAG_NAME]`.

## Features

- Parse tags with or without descriptions
- Strict validation of tag names and descriptions
- Support for whitespace in content and descriptions
- Comprehensive error handling

## Requirements

- PHP 8.0 or higher
- Composer

## Installation

```sh
composer install
```

## Usage

```php
use function ParseTag\parseTagString;

// Basic usage
$result = parseTagString("[TAG]some content[/TAG]");
// Returns:
// [
//     'key' => 'TAG',
//     'value' => [
//         'description' => '',
//         'data' => 'some content'
//     ]
// ]

// With description
$result = parseTagString("[TAG:my description]content here[/TAG]");
// Returns:
// [
//     'key' => 'TAG',
//     'value' => [
//         'description' => 'my description',
//         'data' => 'content here'
//     ]
// ]
```

## Tag Format Specifications

- Tag names must be uppercase and can only contain letters and underscores
- Tag names are limited to 64 characters
- Descriptions are optional and limited to 128 characters
- No nested tags are allowed
- Opening and closing tag names must match
- Whitespace is allowed between components

## Validation Rules

- Tag names must be uppercase (e.g., `TAG_NAME`)
- Tag names can only contain letters and underscores
- Maximum tag name length: 64 characters
- Maximum description length: 128 characters
- Closing tags cannot contain descriptions
- Tags must be properly closed
- No nested tags allowed

## Running Tests

Basic test execution:

```sh
./vendor/bin/phpunit
```

Running tests with coverage report:

```sh
XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-text
```

## Docker Support

The project includes Docker support for running tests in an isolated environment.

### Requirements

- Docker
- Docker Compose

### Running Tests with Docker

Build and run tests:

```sh
docker-compose up --build
```

Run tests with coverage:

```sh
docker-compose run --rm php-tests ./vendor/bin/phpunit --coverage-text
```

Clean up:

```sh
docker-compose down
```

## Error Handling

The parser will throw exceptions for various validation errors:

- Empty tag names
- Non-uppercase tag names
- Illegal characters in tag names
- Tag name length exceeded
- Description length exceeded
- Missing closing tags
- Nested tags
- Mismatched opening/closing tags
- Invalid tag format
