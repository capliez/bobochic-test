import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    handleClick() {
        const code = this.element.innerText;
        navigator.clipboard.writeText(code)
            .then(() => {
                const icon = this.element.querySelector('i');

                if (icon) {
                    this.changeIcon(this.element);
                }

                setTimeout(() => {
                    this.changeIcon(this.element);
                }, 500)

            })
            .catch((error) => {
                console.error('Erreur lors de la copie dans le presse-papiers : ', error);
            });
    }

    changeIcon(element)
    {
        const icon = element.querySelector('i');
        icon.classList.toggle('bi-copy');
        icon.classList.toggle('bi-check2-circle');
        icon.classList.toggle('text-success');
    }
}
