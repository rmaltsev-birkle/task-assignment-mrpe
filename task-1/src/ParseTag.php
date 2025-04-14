<?php

/**
 * Checks if a string starts with a specific token after trimming whitespace
 * @param string $string - string to check
 * @param string $token - token to expect
 * @return int - number of whitespace characters skipped
 * @throws Exception - if token is not found
 */
function expectToken(string $string, string $token): int
{
    $trimmedString = ltrim($string);
    if (!str_starts_with($trimmedString, $token)) {
        throw new Exception("Expected token: $token");
    }
    return strlen($string) - strlen($trimmedString);
}

/**
 * Finds a token in a string starting at a specific position
 * @param string $string - string to search in
 * @param string $token - token to find
 * @param int $position - position to start searching from
 * @return int - index of the token
 * @throws Exception - if token is not found
 */
function findToken(string $string, string $token, int $position = 0): int
{
    $index = strpos($string, $token, $position);
    if ($index === false) {
        throw new Exception("Expected token: $token");
    }
    return $index;
}

/**
 * Extracts the raw components (opening tag, closing tag, data)
 * @param string $string - string to parse
 * @return array - associative array containing openingTag, closingTag, and data
 */
function extractTagComponents(string $string): array
{
    $openingTagStart = expectToken($string, "[");
    $openingTagEnd = findToken($string, "]");
    $closingTagStart = findToken($string, "[", $openingTagEnd);
    $closingTagEnd = findToken($string, "]", $closingTagStart);
    $openingTag = trim(substr($string, $openingTagStart + 1, $openingTagEnd - $openingTagStart - 1));
    $closingTag = trim(substr($string, $closingTagStart + 1, $closingTagEnd - $closingTagStart - 1));
    $data = trim(substr($string, $openingTagEnd + 1, $closingTagStart - $openingTagEnd - 1));
    return [
        'openingTag' => $openingTag,
        'closingTag' => $closingTag,
        'data' => $data,
    ];
}

/**
 * Validates tag name for correctness
 * @param string $tagName - tag name to validate
 * @throws Exception - if the tag name is empty
 * @throws Exception - if the tag name is not uppercased
 * @throws Exception - if the tag name contains illegal characters
 * @throws Exception - if the tag name exceeds length limit of 64 characters
 * @return string - the validated tag name
 */
function validateTagName(string $tagName): string
{
    if ($tagName === '') {
        throw new Exception("Illegal empty tag name");
    }
    if (strtoupper($tagName) !== $tagName) {
        throw new Exception("Expected tag name to be uppercased");
    }
    if (!preg_match('/^[A-Z_]+$/', $tagName)) {
        throw new Exception("Illegal characters in tag name, only alphabetical letters and underscore allowed");
    }
    if (strlen($tagName) > 64) {
        throw new Exception("Tag name exceeds length limit of 64 characters");
    }
    return $tagName;
}

/**
 * Validates tag description for correctness
 * @param string $description - tag description to validate
 * @throws Exception - if the description is empty
 * @throws Exception - if the description exceeds length limit of 128 characters
 * @return string - the validated description
 */
function validateDescription(string $description): string
{
    if ($description === '') {
        throw new Exception("Illegal empty description");
    }
    if (strlen($description) > 128) {
        throw new Exception("Description exceeds length limit of 128 characters");
    }
    return $description;
}

/**
 * Validates opening tag for correctness
 * @param string $tag - tag to validate
 * @throws Exception - if the tag is a closing tag
 * @return string - the validated tag
 */
function validateOpeningTag(string $tag): string
{
    if (str_starts_with($tag, '/')) {
        throw new Exception("Unexpected closing tag");
    }
    return $tag;
}

/**
 * Validates closing tag for correctness
 * @param string $tag - tag to validate
 * @throws Exception - if the tag is not a closing tag
 * @throws Exception - if the tag contains a description
 * @return string - the validated tag
 */
function validateClosingTag(string $tag): string
{
    if (!str_starts_with($tag, '/')) {
        throw new Exception("Tag nesting is not allowed");
    }
    if (strpos($tag, ':') !== false) {
        throw new Exception("Illegal description in closing tag");
    }
    return $tag;
}

/**
 * Validates the tag components and transforms them into the final key-value structure
 * @param array $tagComponents - tag object with opening tag, closing tag and data
 * @return array - the parsed tag object
 */
function validateAndTransformTag(array $tagComponents): array
{
    $openingTag = validateOpeningTag($tagComponents['openingTag']);
    $closingTag = validateClosingTag($tagComponents['closingTag']);

    $tagFragments = array_map('trim', explode(':', $openingTag, 2));
    $key = validateTagName($tagFragments[0]);
    $description = isset($tagFragments[1]) ? validateDescription($tagFragments[1]) : '';
    $closingTagName = validateTagName(substr($closingTag, 1));

    if ($key !== $closingTagName) {
        throw new Exception("Opening tag name does not match closing one");
    }

    return [
        'key' => $key,
        'value' => [
            'description' => $description,
            'data' => $tagComponents['data'],
        ],
    ];
}

/**
 * Parses a tag string and returns the parsed tag object
 * @param string $tag - string to parse
 * @return array - the parsed tag object
 */
function parseTagString(string $tag): array
{
    return validateAndTransformTag(extractTagComponents($tag));
}
