<?php

namespace App\Controller\Front;

use App\Enum\PromoCode;
use App\Enum\Reinsurance;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractFrontController
{

    #[Route('/', name: 'front_home')]
    public function homePage(): RedirectResponse
    {
        return $this->redirectToRoute('front_promo_code');
    }

    #[Route('/code-promos', name: 'front_promo_code')]
    public function promoCodePage(): Response
    {
        return $this->renderTemplate('front/promoCode.html.twig', [
            'promoCodeEnabled' => PromoCode::findBy(),
            'promoCodeDisabled' => PromoCode::findBy(true),
            'allReinsurances' => Reinsurance::ALL,
        ]);
    }
}
