import { saveCardsToLocalStorage } from './localstorage';
import { addDragAndDrop } from './draganddrop';

// Функция для добавления карточки
export function addCard(column, text) {
    const addedCard = document.createElement('div');
    addedCard.classList.add('added-card');
    addedCard.textContent = text;
    addedCard.draggable = true;

    const cardCloseBtn = document.createElement('div');
    cardCloseBtn.classList.add('card-close-btn');
    cardCloseBtn.innerHTML = '×';

    cardCloseBtn.addEventListener('click', () => {
        addedCard.classList.add('removing');
        setTimeout(() => {
            alert(addedCard.textContent);
            addedCard.remove();
            saveCardsToLocalStorage();
        }, 300);
    });

    addedCard.appendChild(cardCloseBtn);

    const createdCardBlock = column.querySelector('.created_card');
    createdCardBlock.appendChild(addedCard);

    addDragAndDrop(addedCard);
    saveCardsToLocalStorage();
}