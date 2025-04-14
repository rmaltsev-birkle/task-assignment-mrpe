<?php

namespace App\EventListener;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Response\JWTAuthenticationFailureResponse;
use Symfony\Component\HttpFoundation\JsonResponse;

final class AuthenticationFailureListener
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    /**
     * @param AuthenticationFailureEvent $event
     */
    public function onAuthenticationFailureResponse(AuthenticationFailureEvent $event)
    {
        $requestCredentials = json_decode($event->getRequest()->getContent(), true);
        $data = [];

        if (json_last_error() === JSON_ERROR_NONE && $requestCredentials['username']) {
            $existingUser = $this->userRepository->findOneBy([ "username" => $requestCredentials['username'] ]);
            if ($existingUser) {
                $data['existing_user'] = true;
            }
        }

        $response = new JWTAuthenticationFailureResponse('Invalid credentials.', JsonResponse::HTTP_UNAUTHORIZED);
        $response->setData($data);

        $event->setResponse($response);
    }
}
