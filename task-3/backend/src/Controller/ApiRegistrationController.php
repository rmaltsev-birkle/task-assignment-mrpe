<?php

namespace App\Controller;

use App\Entity\User;
use App\Model\UserRegistrationDto;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class ApiRegistrationController extends AbstractController
{
    #[Route('/api/registration', name: 'app_api_registration', methods: 'POST', format: 'json')]
    public function index(
        #[MapRequestPayload()] UserRegistrationDto $userRegistrationDto,
        UserPasswordHasherInterface $userPasswordHasher,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        #[CurrentUser()] ?User $currentUser
    ): JsonResponse {
        if ($currentUser) {
            throw new HttpException(403, "You cannot register new users while being signed in");
        }

        $existingUser = $userRepository->findOneBy([ "username" => $userRegistrationDto->username ]);
        if ($existingUser) {
            throw new HttpException(422, "User with this username already exists");
        }

        $user = new User();
        $user->setUsername($userRegistrationDto->username);

        // encode the plain password
        $user->setPassword($userPasswordHasher->hashPassword($user, $userRegistrationDto->password));

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json($userRegistrationDto);
    }
}
