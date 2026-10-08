/**
 * Lavr Protection Script
 * Предназначен для затруднения копирования контента обычными пользователями.
 * ВНИМАНИЕ: Это не настоящая криптография. Опытный разработчик всегда сможет обойти эту защиту.
 */

(function() {
    'use strict';

    // 1. Блокировка выделения текста и перетаскивания изображений
    document.addEventListener('DOMContentLoaded', () => {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        
        // Запрет перетаскивания картинок (чтобы не утащили шаблон на рабочий стол)
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('draggable', 'false');
        });
    });

    // 2. Блокировка контекстного меню (правая кнопка мыши)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, true);

    // 3. Блокировка горячих клавиш
    document.addEventListener('keydown', function(e) {
        // F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (Просмотр исходного кода)
        if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+S (Сохранение страницы)
        if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            return false;
        }

        // Ctrl+C и Ctrl+A (Копирование и выделение всего) - ОПЦИОНАЛЬНО
        // Раскомментируйте следующие строки, если хотите заблокировать даже копирование текста внутри приложения
        /*
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A')) {
            // Разрешаем копирование только если пользователь редактирует текстовое поле
            if (!e.target.isContentEditable && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        }
        */
    }, true);

    // 4. Защита от открытия через iframe (Clickjacking)
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }

    // 5. "Ловушка" для консоли разработчика (Debugger trap)
    // Если кто-то откроет DevTools, этот интервал начнет постоянно ставить паузу, мешая работе
    setInterval(function() {
        const before = new Date().getTime();
        debugger; // Эта строка вызовет паузу, если открыта консоль
        const after = new Date().getTime();
        if (after - before > 100) {
            // Обнаружена задержка, характерная для открытой консоли
            document.body.innerHTML = '<h1 style="text-align:center; margin-top:50px; color:red;">Доступ к исходному коду ограничен.</h1>';
        }
    }, 1000);

})();