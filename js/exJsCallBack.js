
isPair(42, isPairNotif, isNotPairNotif);

function isPair( nb, pairEvent, notPairEvent) {
    if (nb%2 === 0)
    {
        pairEvent();
    }
    else
    {
        notPairEvent();
    }
}

function isPairNotif() {
    console.log("It a multiple of 2");
}

function isNotPairNotif() {
    console.log("You deserve death !");
}

fruitEvents=[];

fruitEvents['Pomme'] = function () {console.log("I'm green")};
fruitEvents['Citron']= function () {console.log("I'm yellow")};
fruitEvents['Orange']= function () {console.log("I'm Orange")};
fruitEvents['Banane']= function () {console.log("I'm yellow too")};

sendFruitEvent('fraise', fruitEvents);
sendFruitEvent('Pomme', fruitEvents);

function sendFruitEvent(fruit, fruitEvents){
    if (!isNaN(fruitEvents[fruit])){
        fruitEvents[fruit];
    } else {
        console.log("I d'ont know this fruit !");
    }
}