import { saveCardsToLocalStorage } from './localstorage';

export function handler(e) {
    e.preventDefault();
    const text = e.dataTransfer.getData('text/plain');
    const draggedCard = Array.from(document.querySelectorAll('.added-card'))
        .find(card => card.textContent === text);

    if (draggedCard) {
        const target = e.target.closest('.added-card') || e.target.closest('.created_card');
        if (target) {
            const targetColumn = target.closest('.column');
            const createdCardBlock = targetColumn.querySelector('.created_card');
            if (target.classList.contains('added-card')) {
                target.parentElement.insertBefore(draggedCard, target);
            } else {
                createdCardBlock.appendChild(draggedCard);
            }
        }
        saveCardsToLocalStorage();
    }

    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}