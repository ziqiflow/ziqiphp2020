<?php


namespace App\Http\Controllers\Tool\Emoji;

use Exception;
class UnknownCharacter extends Exception
{
    public static function create($character) : UnknownCharacter
    {
        return new static("Character `{$character}` does not exist");
    }
}