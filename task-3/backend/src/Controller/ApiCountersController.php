<?php

namespace App\Controller;

use App\Entity\Counter;
use App\Entity\User;
use App\Model\CounterDto;
use App\Repository\CounterRepository;
use App\Model\CounterFiltersDto;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

final class ApiCountersController extends AbstractController
{
    #[Route('/api/counters', name: 'app_api_counters', methods: 'GET', format: 'json')]
    public function findCounters(
        #[MapQueryString()] CounterFiltersDto $filters,
        CounterRepository $counterRepository
    ): JsonResponse {
        if ($filters->user) {
            $counters = $counterRepository->findBy([ "user" => $filters->user ]);
        } else {
            $counters = $counterRepository->findAll();
        }
        return $this->json($counters);
    }

    #[Route('/api/counters/{id}', name: 'app_api_counter', methods: 'GET', format: 'json')]
    public function findCounter(Counter $counter): JsonResponse
    {
        return $this->json($counter);
    }

    #[Route('/api/counters', name: 'app_api_create_counter', methods: 'POST', format: 'json')]
    public function createCounter(
        #[MapRequestPayload()] CounterDto $counterDto,
        #[CurrentUser()] User $user,
        EntityManagerInterface $entityManager,
        CounterRepository $counterRepository,
    ) {
        $existingCounter = $counterRepository->findOneBy([ "user" => $user ]);

        if ($existingCounter) {
            throw new HttpException(422, "User already has a counter");
        }

        $counter = new Counter();
        $counter->setValue($counterDto->value);
        $counter->setUser($user);

        $entityManager->persist($counter);
        $entityManager->flush();

        return $this->json($counter);
    }

    #[Route('/api/counters/{id}', name: 'app_api_update_counter', methods: 'PUT', format: 'json')]
    public function updateCounter(
        int $id,
        #[MapRequestPayload()] CounterDto $counterDto,
        #[CurrentUser()] User $user,
        EntityManagerInterface $entityManager,
        CounterRepository $counterRepository,
    ) {
        $counter = $counterRepository->findOneBy([ "id" => $id, "user" => $user ]);

        if (!$counter) {
            throw $this->createNotFoundException("This counter does not exist on user");
        }

        $counter->setValue($counterDto->value);

        $entityManager->persist($counter);
        $entityManager->flush();

        return $this->json($counter);
    }
}
