<?php

namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

final class JWTCreatedListener
{
    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $payload = $event->getData();
        $payload['id'] = 999;

        $event->setData($payload);

        /** @var User $user */
        $user = $event->getUser();

        if (!$user) {
            return;
        }

        $payload['id'] = $user->getId();

        $event->setData($payload);
    }
}
