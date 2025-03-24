import { addCard } from './addcard';

// Функция для замены статической кнопки на динамическую
export function replaceStaticButton(staticButton) {
    staticButton.style.display = 'none';

    const textarea = document.createElement('textarea');
    textarea.classList.add('dynamic-textarea');
    textarea.placeholder = 'Введите текст...';

    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.border = ''; // Убираем красную рамку после ввода текста
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