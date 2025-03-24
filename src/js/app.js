/* eslint-disable prettier/prettier */
import { saveCardsToLocalStorage, loadCardsFromLocalStorage } from './localstorage';
import { replaceStaticButton } from './dom';
import { handler } from './drop';

const staticButtons = document.querySelectorAll('.static-button');

staticButtons.forEach(button => {
    button.addEventListener('click', () => replaceStaticButton(button));
});

/* ************************************************************* */
document.querySelectorAll('.created_card').forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.classList.add('drag-over');
    });

    container.addEventListener('dragleave', () => {
        container.classList.remove('drag-over');
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('drag-over');
    });

    container.addEventListener('drop', handler);
});
/* ************************************************************** */

// Загрузка карточек при загрузке страницы
window.addEventListener('load', loadCardsFromLocalStorage);