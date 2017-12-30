<?php
namespace App\Controller\Api;


use App\Interfaces\DatabaseInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController
{
    /**
     * @Route("/api/", name="api")
     * @param DatabaseInterface $database
     * @return JsonResponse
     */
    public function index(
        DatabaseInterface $database
    ): JsonResponse {
        return new JsonResponse($database->select('SELECT * FROM os_resources_items'));
    }
}