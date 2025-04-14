<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ApiUsersController extends AbstractController
{
    #[Route('/api/users', name: 'app_api_users')]
    public function findUsers(UserRepository $userRepository): JsonResponse
    {
        /** @var array<int, User> */
        $users = $userRepository->findAll();
        return $this->json($users);
    }

    #[Route('/api/users/{id}', name: 'app_api_user')]
    public function findUser(User $user): JsonResponse
    {
        return $this->json($user);
    }
}
