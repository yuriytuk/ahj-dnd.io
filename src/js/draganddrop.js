import { saveCardsToLocalStorage } from './localstorage';
import { handler } from './drop';

// Функция для добавления Drag and Drop
export function addDragAndDrop(card) {
    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.textContent);
        setTimeout(() => card.classList.add('hidden'), 0);
        document.body.classList.add('dragging');
    });
    // перетаскивание завершено
    card.addEventListener('dragend', () => {
        card.classList.remove('hidden');
        document.body.classList.remove('dragging');
    });

    // элемент покидает целевую область
    card.addEventListener('dragleave', (e) => {
        const target = e.target.closest('.added-card') || e.target.closest('.created_card');
        if (target) {
            target.classList.remove('drag-over');
        }
    });
    // элемент сбрасывается в допустимую область
    card.addEventListener('drop', handler);

    document.querySelectorAll('.created_card').forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            container.classList.add('drag-over');
        });

        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });

        container.addEventListener('drop', handler);
    });
}