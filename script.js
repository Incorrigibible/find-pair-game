/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {boolean} state
 * @property {string} src
 */

/**
 *
 * @param {Array<number>} sequence
 * @returns {Card[]}
 */
const createCard = (sequence) => {
    const cards = [];
    for (const element of sequence) {
        const card = {
            id: element,
            state: false,
            src: `./assets/img/${element}.jpg`,
        };
        cards.push(card);
    }
    return cards;
};
/**
 *
 * @param {number} cardCount
 * @returns {Array<number>}
 */
const generateCardSeq = (cardCount) => {
    const cardArr = [];
    for (let i = cardCount / 2; i > 0; i--) {
        cardArr.push(i);
    }

    const resultArr = [...cardArr, ...cardArr];
    resultArr.sort(() => Math.random() - 0.5);
    // console.log(resultArr);
    return resultArr;
};
const addCards = (cards) => {
    const container = document.querySelector('#find-pair-game');
    const cardList = document.createElement('ul');
    cardList.classList.add('card-list');

    container.append(cardList);
    cards.forEach((element) => {
        const card = document.createElement('li');
        card.classList.add('card-item');
        const img = document.createElement('img');
        img.src = `./assets/img/backside.jpg`;
        img.setAttribute('alt', element.id);

        card.append(img);
        cardList.append(card);
    });
};

const createGame = (cardCount) => {
    const sequence = generateCardSeq(cardCount);
    const cards = createCard(sequence);
    const addCard = addCards(cards);

    // console.log(addCards(createCard(generateCardSeq(6))));

    const allCards = document.querySelectorAll('img');
    // console.log(allCards);
    let forUnflip = [];
    let lastCard = null;
    let legitPair = [];

    const unflip = (cards) => {
        for (card of cards) {
            card.src = `./assets/img/backside.jpg`;
        }
    };

    allCards.forEach((imgElem) => {
        imgElem.addEventListener('click', () => {
            if (
                legitPair.includes((alt) => {
                    console.log('уже сыгранная пара');
                    return imgElem.alt === alt;
                })
            )
                return;
            imgElem.classList.add('flipped');
            imgElem.src = `./assets/img/${imgElem.alt}.jpg`;
            forUnflip.push(imgElem);

            // console.log(imgElem.alt, lastCard.alt);

            if (imgElem.alt === lastCard?.alt) {
                forUnflip = [];
                legitPair.push(imgElem.alt);
                console.log('нашлась пара');
                if (allCards.length / 2 === legitPair.length) {
                    alert('You won!');
                    window.location.reload();
                }
                return;
            }
            lastCard = imgElem;

            // console.log(lastCard);
            if (forUnflip.length === 2) {
                console.log('перевернули карты' + forUnflip);
                setTimeout(() => {
                    unflip(forUnflip);
                    lastCard = null;
                    forUnflip = [];
                }, 1000);
            }
            // console.log(allCards.length / 2, legitPair.length);
        });
    });
};

const createGreeting = (container) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    const heading = document.createElement('h1');
    heading.textContent = 'Find pair game!';

    button.textContent = 'Accept';
    const gameDescription = document.createElement('p');
    gameDescription.textContent = 'Enter the number of cards';

    container.prepend(wrapper);
    wrapper.append(heading);
    wrapper.append(gameDescription);
    wrapper.append(form);
    form.append(input);
    form.append(button);

    const validateCardNumber = (cardNumber) =>
        Number.isInteger(cardNumber) &&
        cardNumber <= 10 &&
        cardNumber % 2 === 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardCount = Number(input.value);
        if (!validateCardNumber(cardCount)) {
            alert('please enter the correct number');
            return;
        } else {
            wrapper.classList.add('hidden');
            createGame(cardCount);
        }
    });
};

const startGame = (container) => {
    createGreeting(container);
};
// console.log(addCards(createCard(generateCardSeq(6))));

// const allCards = document.querySelectorAll('img');
// console.log(allCards);

// allCards.forEach((imgElem) => {
//     imgElem.addEventListener('click', () => {
//         console.log(12);
//     });
// });
