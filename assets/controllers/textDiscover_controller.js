import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        const bannerDiscover = this.element;

        let index = 1;
        const discovers = [
            "Découvrez notre sélection de produits en stock livrés chez vous en 10 jours",
            "Réglez en 2x, 3x ou 10x",
            "Le savoir faire d’une marque française",
        ];

        bannerDiscover.textContent = discovers[0];

        function handleChangeDiscover() {
            bannerDiscover.textContent = discovers[index];
            index = (index + 1) % discovers.length;
        }

        setInterval(handleChangeDiscover, 5000);

    }

}
