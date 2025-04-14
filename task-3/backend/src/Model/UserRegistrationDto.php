<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class UserRegistrationDto
{
    public function __construct(
        #[Assert\NotBlank()]
        #[Assert\Length(min: 3)]
        public string $username,
        #[Assert\NotBlank()]
        #[Assert\Length(min: 6)]
        public string $password
    ) {
    }
}
