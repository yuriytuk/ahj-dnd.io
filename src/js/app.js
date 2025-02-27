/* eslint-disable prettier/prettier */
const staticButtons = document.querySelectorAll('.static-button');

staticButtons.forEach(button => {
    button.addEventListener('click', () => replaceStaticButton(button));
});

// Функция для замены статической кнопки на динамическую
function replaceStaticButton(staticButton) {
    staticButton.style.display = 'none';

    const textarea = document.createElement('textarea');
    textarea.classList.add('dynamic-textarea');
    textarea.placeholder = 'Введите текст...';

    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    });

    const dynamicContainer = document.createElement('div');
    dynamicContainer.classList.add('dynamic-container');

    const dynamicButton = document.createElement('button');
    dynamicButton.classList.add('dynamic-button');
    dynamicButton.textContent = 'Add Card';

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '×';

    dynamicButton.addEventListener('click', () => {
        const text = textarea.value.trim();
        if (text) {
            const column = staticButton.closest('.column');
            addCard(column, text);
            textarea.remove();
            dynamicContainer.remove();
            staticButton.style.display = 'flex';
        } else {
            textarea.style.border = '1px solid red';
            textarea.placeholder = 'Поле не может быть пустым!';
        }
    });

    closeBtn.addEventListener('click', () => {
        textarea.remove();
        dynamicContainer.remove();
        staticButton.style.display = 'flex';
    });

    dynamicContainer.appendChild(dynamicButton);
    dynamicContainer.appendChild(closeBtn);

    staticButton.parentElement.insertBefore(textarea, staticButton);
    staticButton.parentElement.insertBefore(dynamicContainer, staticButton);
    textarea.focus();
}

// Функция для добавления карточки
function addCard(column, text) {
    const addedCard = document.createElement('div');
    addedCard.classList.add('added-card');
    addedCard.textContent = text;
    addedCard.draggable = true;

    const cardCloseBtn = document.createElement('span');
    cardCloseBtn.classList.add('card-close-btn');
    cardCloseBtn.innerHTML = '×';

    cardCloseBtn.addEventListener('click', () => {
        addedCard.classList.add('removing');
        setTimeout(() => {
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



// Функция для добавления Drag and Drop
function addDragAndDrop(card) {
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

    // элемент находится над допустимой областью для сброса.
    card.addEventListener('dragover', (e) => {
        e.preventDefault();
        
        const target = e.target.closest('.added-card') || e.target.closest('.created_card');
        if (target) {
            target.classList.add('drag-over');
        }           
    });
    
    // элемент покидает целевую область
    card.addEventListener('dragleave', (e) => {
        const target = e.target.closest('.added-card') || e.target.closest('.created_card');
        if (target) {
            target.classList.remove('drag-over');
        }
    });
    
    // элемент сбрасывается в допустимую область
    card.addEventListener('drop', (e) => {
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
                    createdCardBlock.appendChild(e.target);
                }
            }
        
            saveCardsToLocalStorage();
        }

        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    });
}


// Функция для сохранения карточек в localStorage
function saveCardsToLocalStorage() {
    const columns = document.querySelectorAll('.column');
    const cardsData = [];

    columns.forEach(column => {
        const columnName = column.getAttribute('data-column');
        const cards = column.querySelectorAll('.added-card');
        const columnCards = [];

        cards.forEach(card => {
            columnCards.push(card.textContent.slice(0, -1));
        });

        cardsData.push({ column: columnName, cards: columnCards });
    });

    localStorage.setItem('cards', JSON.stringify(cardsData));
}

// Функция для загрузки карточек из localStorage
function loadCardsFromLocalStorage() {
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

// Загрузка карточек при загрузке страницы
window.addEventListener('load', loadCardsFromLocalStorage);