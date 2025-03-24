import { addCard } from './addcard';

// Функция для сохранения карточек в localStorage
export function saveCardsToLocalStorage() {
    const columns = document.querySelectorAll('.column');
    const cardsData = [];

    columns.forEach(column => {
        const columnName = column.getAttribute('data-column');
        const cards = column.querySelectorAll('.added-card');
        const columnCards = [];

        /*cards.forEach(card => {
            columnCards.push(card.textContent.slice(0, -1));
        });*/
        cards.forEach(card => {
            columnCards.push(card.dataset.text || card.textContent);
        });

        cardsData.push({ column: columnName, cards: columnCards });
    });

    localStorage.setItem('cards', JSON.stringify(cardsData));
}

// Функция для загрузки карточек из localStorage
export function loadCardsFromLocalStorage() {
    const cardsData = JSON.parse(localStorage.getItem('cards')) || [];
    const columns = document.querySelectorAll('.column');

    cardsData.forEach(data => {
        const column = Array.from(columns).find(col => col.getAttribute('data-column') === data.column);
        if (column) {
            data.cards.forEach(text => {
                addCard(column, text);
            });
        }
    });
}