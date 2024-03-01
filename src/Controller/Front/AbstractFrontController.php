<?php

namespace App\Controller\Front;

use App\Enum\Rubric;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class AbstractFrontController extends AbstractController
{

    public function renderTemplate(string $template, array $parameters = []): Response
    {

        $parameters = array_merge($parameters, ['rubrics' => Rubric::ALL]);

        return $this->render($template, $parameters);
    }
}