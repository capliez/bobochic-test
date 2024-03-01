<?php

namespace App\Enum;

use DateTime;

class PromoCode
{
    private const ALL = [
        [
            'code' => 'VENTEFLASH',
            'startAt' => '2025-02-25',
            'expiredAt' => '2024-03-04',
        ],
        [
            'code' => 'TAPISGRATUIT',
            'startAt' => '2024-02-01',
            'expiredAt' => '2024-03-06',
        ],
        [
            'code' => 'LEOPOLD10',
            'startAt' => '2024-02-21',
            'expiredAt' => '2024-03-10',
        ],
        [
            'code' => 'BOUGIE15',
            'startAt' => '2024-02-20',
            'expiredAt' => '2024-03-31',
        ],
        [
            'code' => 'SOLDE2024',
            'startAt' => '2024-01-24',
            'expiredAt' => '2024-02-02',
        ],
        [
            'code' => 'MOISBLANC',
            'startAt' => '2024-01-01',
            'expiredAt' => '2024-01-23',
        ]
    ];

    /**
     * Retrieve code promos based on expiration status
     *
     * @param bool $isExpired // If true, retrieve expired code promos; otherwise, retrieve valid code promos
     * @return array
     * @throws \Exception
     */
    public static function findBy(bool $isExpired = false): array
    {
        $filteredElement = array_filter(self::ALL, function ($element) use ($isExpired) {
            $expiredAt = new DateTime($element['expiredAt']);
            $dateNow = new DateTime();

            return $isExpired ? $expiredAt < $dateNow : $expiredAt > $dateNow;
        });

        $expiredAt = array_column($filteredElement, 'expiredAt');

        array_multisort($expiredAt, SORT_ASC, $filteredElement);

        return $filteredElement;
    }
}