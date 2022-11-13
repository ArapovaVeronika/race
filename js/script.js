// function test(word = 'ok', word2 = 'Veronika') {
//     console.log(word, word2);
// }
// test('hi')

let check = 0;
let bet = 0;
let selectedCar = '';
let carWinner = false;
let width = document.querySelector('.track1').offsetWidth;
let hight =( width / 100) * 13;
console.log(width, hight)
let body = document.querySelector('body');
body.style.setProperty('--hight',hight + 'px');
let checkIncrease = document.querySelector('.contol__increase');
let checkSpan = document.querySelector('#check');
let plusBet  = document.querySelector('#plusBet');
let minusBet = document.querySelector('#minusBet');
let allBet = document.querySelector('#allBet');
let BetSpan = document.querySelector('#bet'); 
let winnerOneButton = document.querySelector('#winnerOne'); 
let winnerTwoButton = document.querySelector('#winnerTwo'); 
let startButton = document.querySelector('#start');
let car1 = document.querySelector('#car1'); 
let car2 = document.querySelector('#car2'); 
let history = document.querySelector('.history');
let historyPozition = history.getBoundingClientRect().top;

checkIncrease.onclick = function(){
    check = 30;
    checkSpan.innerHTML = check;
    checkIncrease.classList.add('animation_none');
    let historyItem = document.createElement('li');
    historyItem.innerHTML = 'Пополнение счёта. Текущий счёт: 30$';
    history.appendChild(historyItem);
}

allBet.onclick = function(){
    bet = bet + check;
    check = 0;
    BetSpan.innerHTML = bet;
    checkSpan.innerHTML = 0;
}


plusBet.onclick = function(){
    if(check > 0){
        check = check - 10;
        bet = bet + 10;
    }else{
        alert('Недостаточно средств');
    }
    BetSpan.innerHTML = bet;
    checkSpan.innerHTML = check;
}

minusBet.onclick = function(){
    if(bet > 0){
        check = check + 10;
        bet = bet - 10;
    }else{
        alert('Пополни ставку');
    }
    BetSpan.innerHTML = bet;
    checkSpan.innerHTML = check;
}

winnerOneButton.onclick = function(){
    winnerOneButton.classList.add('active');
    winnerTwoButton.classList.remove('active');
    selectedCar = 'car 1';
}
winnerTwoButton.onclick = function(){
    winnerOneButton.classList.remove('active');
    winnerTwoButton.classList.add('active');
    selectedCar = 'car 2';
}

startButton.onclick = function(){
    carWinner = false;
    if(bet > 0 & selectedCar != ''){ 
        window.scrollTo({
            behavior: 'smooth',
            top:80
        });
        document.querySelector('.control__buttons').classList.add('none');
        document.querySelector('.control__buttons2').classList.add('none');
        let historyItem = document.createElement('li');
        historyItem.innerHTML = 'Ставка: ' + bet + ' $ на ' + selectedCar + '.';
        history.appendChild(historyItem);
        move(car1, 'car 1', historyItem);
        move(car2, 'car 2', historyItem);
    }else{
        alert('Пополни ставку и выбери победителя');
    }
}

function move (car, carNamber, historyItem){ // функция для движения автомобилей 
    let carProgress = 0; // переменная в которую попадает расстояние которое проехал автомобиль
    let carProgressInterval = setInterval(() => { //запускаем интервальную функцию (200раз за 1 сек)
        let speed = Math.random() * 0.15;
        carProgress = carProgress + speed; // увеличиваем расстояние которое проехала машина на 0.1
        car.style.left = carProgress + '%'; // это расстояние подставляем в цсс
        console.log(carProgress)
        if(carProgress > 85){ // если расстояние больше 85
            window.scrollTo({
                behavior: 'smooth',
                top:historyPozition
            });
            carWinner = true;// победитель есть
            let resultSpan = document.createElement('span');
            if( selectedCar == carNamber){
                check = check + bet * 2;
                bet = 0;
                BetSpan.innerHTML = 0;
                checkSpan.innerHTML = check;
                resultSpan.classList.add('green');
                resultSpan.innerHTML = ' Победа! Текущий счёт: ' + check + '$.';
            }else{
                bet = 0;
                BetSpan.innerHTML = 0;
                resultSpan.classList.add('red');
                resultSpan.innerHTML = ' Провал! Текущий счёт: ' + check + '$.';
                if(check == 0){
                    checkIncrease.classList.remove('animation_none');
                }
            }
            historyItem.appendChild(resultSpan);
        }
        if(carWinner == true){
            clearInterval(carProgressInterval); // то интервал.функцию ост.
            document.querySelector('.control__buttons').classList.remove('none');
            document.querySelector('.control__buttons2').classList.remove('none');
            winnerOneButton.classList.remove('active');
            winnerTwoButton.classList.remove('active');
        }
    }, 5)
}
