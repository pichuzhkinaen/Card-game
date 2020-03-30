window.addEventListener('DOMContentLoaded', function() {
'use strict';

    let cards = document.querySelector('.cards'),
        data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        dataCount = data.length;

        //создание карточек и присваивание им случайных чисел
        for (let i = 0; i < dataCount; i++) {

            let card = document.createElement('div'); //созданы карточки
                card.className = 'cards__card';
                cards.appendChild(card);

            let span = document.createElement('span'); //создан спан для хранения данных карточек
                span.className = 'cards__card__span';
                span.style.visibility = 'hidden'; //данные карточек скрыты
                card.appendChild(span);

                //в переменной вызывается функция для генерации случайного числа в диапазоне от 0 индекса массива до длины массива -1 (8 индекс) 
                let randomNum = getRandomInteger(0, data.length-1);
                // console.log('randomNum: ' + randomNum);

                //запись числа со сгенерированным индексом в карточку
                span.innerHTML = data[randomNum];

                //удаление записанного числа
                data.splice(randomNum, 1);
                // console.log(data);
                // console.log(card.innerHTML);

                card.addEventListener ('click', clickCard); //вызов функции клика
        }
        

    let card = document.querySelectorAll('.cards__card'); //получение карточки из документа

    //случайное число
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //работа с карточками (подсчет кликов, открытие и т.д.)
    let clicks = 0, //общие клики
        clicks2 = 0, //1-2 клик
        a, b, // хранят карточки, которые находятся в таргете
        spanA; //цифры внутри карточек

    async function clickCard(e) {
        let target = event.target;

        //если таргет на спане, таргетом считать его родителя
        if (target.tagName == 'SPAN') {
            target = target.parentElement;
        }
        // console.log('target = ' + target);
        // console.log('target type = ' + target.tagName);
        
        //проверка карточки на наличие класса активности
        if (target.className != 'cards__card_active') {
            let spanTarg = target.querySelector('.cards__card__span'); //создана переменная для хранения спана, находящегося в таргете
            // console.log('active');
            //clicks += 1; //счетчик кликов
            clicks2 += 1;
            // console.log('spanTarg = ' + spanTarg);
            // console.log('clicks2 = ' + clicks2);
            
            //если первый клик, добавить карточке класс активности
            if (clicks2 == 1) {
                clicks += 1;
                target.className = 'cards__card_active';
                a = target; //записать данные карточки под таргетом в переменную
                spanA = a.querySelector('.cards__card__span'); //получить данные из карточки после первого клика

                spanTarg.style.visibility = 'visible'; //данные карточки видимы
                // console.log(target.querySelector('.cards__card__span'));

            //если второй клик и первая карточка (которая ранее была под таргетом) не равна той, которая под тагретом в данный момент
            } else if (clicks2 == 2 && a != target) {
                clicks += 1;
                target.className = 'cards__card_active'; // добавить класс активности
                b = target; //записать данные карточки под таргетом в переменную
                // console.log(spanTarg);
                spanTarg.style.visibility = 'visible';
                
                    //сравнить содержание карточек, если оно равно удалить возможность клика
                    if (a.innerHTML == b.innerHTML) {
                        // console.log('disabled');
                        await delay(500);
                        a.removeEventListener('click', clickCard); 
                        b.removeEventListener('click', clickCard);
                    } else if (a.innerHTML != b.innerHTML) { //если не равно вернуть первоначальные стили
                        // console.log(a.innerHTML);
                        // console.log('pause start');
                        await delay(500); //вызов функции паузы
                        // console.log('pause stop');
                        a.className = 'cards__card';
                        b.className = 'cards__card';

                        let spanTarg = target.querySelector('.cards__card__span'); //цифры в карточках
                        spanTarg.style.visibility = 'hidden';
                        spanA.style.visibility = 'hidden';
                        // console.log(spanTarg);
                        // console.log(a.innerHTML);
                    }
            clicks2 = 0;
            } 
        }
        console.log('clicks = ' + clicks);

        //открытие модального окна
        let d = 0;

        for (let j = 0; j < dataCount; j++) {
            if (card[j].className == 'cards__card_active') {
                d += 1; //счетчик активных карт
                if (d == dataCount) {
                    console.log('Win');
                    openModal();
                }
            }
        }
    }

    //функция паузы
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    //модальное окно
    function openModal() {
        let modal = document.getElementById('modal'),
            overlay = document.getElementById('overlay'),
            btn = document.getElementById('btn'),
            title = document.querySelector('.modal__title');

        modal.style.display = "block";
        overlay.style.display = "block";

        //создание подзаголовка
        let steps = document.createElement('h3');
        steps.className = 'modal__subtitle';
        title.after(steps);
        title.append(steps);

        steps = document.querySelector('.modal__subtitle'); //получение созданного элемента из документа
        // console.log(steps);
        steps.textContent = 'Количество  шагов:  ' + clicks; //добавление текстового контента

        //закрытие модального окна по кнопке ОК
        btn.onclick = function () {
            modal.style.display = "none";
            overlay.style.display = "none";
        };
        
        // Закрытие modal при клике вне его окна
        overlay.onclick = function (event) {     
            // console.log('overlay.onclick');
            if (event.target == overlay) {
                modal.style.display = "none";
                overlay.style.display = "none";
            }
        };
    }
});