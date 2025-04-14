<?php

use PHPUnit\Framework\Attributes\CoversFunction;
use PHPUnit\Framework\TestCase;

#[CoversFunction("parseTagString")]
#[CoversFunction("expectToken")]
#[CoversFunction("findToken")]
#[CoversFunction("extractTagComponents")]
#[CoversFunction("validateAndTransformTag")]
#[CoversFunction("validateClosingTag")]
#[CoversFunction("validateDescription")]
#[CoversFunction("validateOpeningTag")]
#[CoversFunction("validateTagName")]
class ParseTagTest extends TestCase
{
    public function testExpectToken()
    {
        $this->assertEquals(0, expectToken("[TAG]", "[", "Expect token at index 0"));
        $this->assertEquals(2, expectToken("  [TAG]", "["), "Expect token at index 2");
        $this->assertEquals(3, expectToken(" \n [TAG]", "["), "Expect token at index 3");
    }

    public function testExpectTokenThrowsExceptionWhenTokenNotPresent()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected token: [");
        expectToken("<[TAG]>", "[");
    }

    public function testFindToken()
    {
        $this->assertEquals(4, findToken("[TAG]", "]"), "Expect token at index 4");
        $this->assertEquals(9, findToken("[TAG]text[/TAG]", "[", 5), "Expect token at index 9 if position argument is used");
    }

    public function testFindTokenThrowsExceptionWhenTokenNotFound()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected token: ]");
        findToken("<tag>", "]");
    }

    public function testExtractTagComponents()
    {
        $expected = [
            'openingTag' => 'TAG',
            'closingTag' => '/TAG',
            'data' => 'content more content',
        ];

        $this->assertEquals($expected, extractTagComponents("  [ TAG  ] content more content [ /TAG  ]  "));
    }

    public function testExtractTagComponentsThrowsExceptions()
    {
        // Test case 1: Missing opening bracket
        try {
            extractTagComponents("TAG] content more content");
            $this->fail("Exception not thrown for missing opening bracket");
        } catch (Exception $e) {
            $this->assertEquals("Expected token: [", $e->getMessage());
        }

        // Test case 2: Missing closing bracket in opening tag
        try {
            extractTagComponents("[TAG content more content");
            $this->fail("Exception not thrown for missing closing bracket in opening tag");
        } catch (Exception $e) {
            $this->assertEquals("Expected token: ]", $e->getMessage());
        }

        // Test case 3: Missing opening bracket in closing tag
        try {
            extractTagComponents("[TAG]content more content /TAG]");
            $this->fail("Exception not thrown for missing opening bracket in closing tag");
        } catch (Exception $e) {
            $this->assertEquals("Expected token: [", $e->getMessage());
        }

        // Test case 4: Missing closing bracket in closing tag
        try {
            extractTagComponents("[TAG]content more content[/TAG");
            $this->fail("Exception not thrown for missing closing bracket in closing tag");
        } catch (Exception $e) {
            $this->assertEquals("Expected token: ]", $e->getMessage());
        }
    }

    public function testValidateAndTransformTag()
    {
        $tagComponents1 = extractTagComponents("[TAG:hello world]content more content[/TAG]");
        $expected1 = [
            'key' => 'TAG',
            'value' => [
                'description' => 'hello world',
                'data' => 'content more content',
            ],
        ];
        $this->assertEquals($expected1, validateAndTransformTag($tagComponents1));

        $tagComponents2 = extractTagComponents("  [ TAG : hello world ] content more content [ /TAG  ]  ");
        $expected2 = [
            'key' => 'TAG',
            'value' => [
                'description' => 'hello world',
                'data' => 'content more content',
            ],
        ];
        $this->assertEquals($expected2, validateAndTransformTag($tagComponents2));
    }

    // Parse Tag String Tests

    public function testParseTagStringThrowsErrorIfNoOpeningTagPresent()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected token: [");
        parseTagString("just a text");
    }

    public function testParseTagStringThrowsErrorIfNoOpenTagIsDefined()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal empty tag name");
        parseTagString("[]just a text[/]");
    }

    public function testParseTagStringThrowsErrorIfOpeningTagIsEmpty()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal empty tag name");
        parseTagString("[:]just a text[/]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagFoundInsteadOfOpening()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Unexpected closing tag");
        parseTagString("[/TAG]just a text[/TAG]");
    }

    public function testParseTagStringThrowsErrorIfOpeningTagNotUppercase()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected tag name to be uppercased");
        parseTagString("[tag]just a text[/tag]");
    }

    public function testParseTagStringThrowsErrorIfTagNameContainsIllegalCharacters()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal characters in tag name, only alphabetical letters and underscore allowed");
        parseTagString("[\$TAGN123E QWE]just a text[/\$TAGN123E QWE]");
    }

    public function testParseTagStringThrowsErrorIfTagNameExceedsLengthLimit()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Tag name exceeds length limit of 64 characters");
        parseTagString("[VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE]just a text[/VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE]");
    }

    public function testParseTagStringThrowsErrorIfDescriptionIsOmittedButSeparatorIsUsed()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal empty description");
        parseTagString("[TAG:]just a text[/TAG]");
    }

    public function testParseTagStringThrowsErrorIfDescriptionLengthExceedsLimit()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Description exceeds length limit of 128 characters");
        parseTagString("[TAG:Eveniet tenetur exercitationem fugit neque deserunt odit distinctio voluptate. Eveniet tenetur exercitationem fugit neque deserunt odit distinctio voluptate.]just a text[/TAG]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagIsNotFound()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected token: [");
        parseTagString("[TAG]just a text");
    }

    public function testParseTagStringThrowsErrorIfClosingTagIsEmpty()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal empty tag name");
        parseTagString("[TAG]just a text[/]");
    }

    public function testParseTagStringThrowsErrorIfAnotherOpeningTagIsFound()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Tag nesting is not allowed");
        parseTagString("[TAG]just a text[TAG]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagNameIsNotUppercased()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Expected tag name to be uppercased");
        parseTagString("[TAG]just a text[/tag]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagNameContainsIllegalCharacters()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal characters in tag name, only alphabetical letters and underscore allowed");
        parseTagString("[TAG_NAME]just a text[/\$TAGN123E QWE]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagNameLengthExceedsLimit()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Tag name exceeds length limit of 64 characters");
        parseTagString("[TAG_NAME]just a text[/VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE_VERY_LONG_TAG_NAME_USED_HERE]");
    }

    public function testParseTagStringThrowsErrorIfOpeningTagNameDoesNotMatchClosingOne()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Opening tag name does not match closing one");
        parseTagString("[TAG_NAME]just a text[/OTHER_TAG]");
    }

    public function testParseTagStringThrowsErrorIfClosingTagNameIncludesDescription()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Illegal description in closing tag");
        parseTagString("[TAG_NAME]just a text[/OTHER_TAG:description]");
    }

    public function testParseTagStringAllowsWhiteSpaceBetweenFragments()
    {
        try {
            parseTagString(" [ TAG_NAME : hello world ] content is here [ /TAG_NAME ] ");
            $this->assertTrue(true);
        } catch (Exception $e) {
            $this->fail("Exception thrown: " . $e->getMessage());
        }
    }

    public function testParseTagStringReturnsCorrectStructure()
    {
        $expected = [
            'key' => 'TAG',
            'value' => [
                'description' => 'my description',
                'data' => 'my content here',
            ],
        ];

        $this->assertEquals($expected, parseTagString("[TAG: my description] my content here [/TAG]"));
    }
}
