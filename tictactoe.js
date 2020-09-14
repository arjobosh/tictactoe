const GameBoard = () => {
    const Board = [];


}

const Player = (name) => {
    const printName = () => console.log(name);
    const getName = () => { return name };
    return { printName, getName };
};

const jeff = Player('jeff');
jeff.printName();
console.log(jeff.getName());

// inheritance
const First = (name) => {
    const { printName } = Player(name);
    const doThing = () => { console.log('did that') };
    return { printName, doThing };
}

const me = First('foreal?');
me.doThing();
me.printName();



const displayBoard = document.getElementById('gameboard');
for (let i = 0; i < 9; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell';
    displayBoard.appendChild(cell);
}