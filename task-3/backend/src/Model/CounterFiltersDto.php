<?php

namespace App\Model;

class CounterFiltersDto
{
    public function __construct(
        public ?int $user,
    ) {
    }
}
