#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Player {
    name: string;
    fuel: number = 100;

    constructor (myPlayerName: string) {
        this.name= myPlayerName
    }

    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }

    fuelIncrease() {
        this.fuel = this.fuel + 25;
    }
}

// Opponent Class

class Opponent {
    name: string;
    fuel: number = 100;

    constructor (opponentName: string) {
        this.name = opponentName;
    }

    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }  
}

// Ask user name and opponent name 

let userInput = await inquirer.prompt([
    {
        name: "myName",
        type: "input",
        message: "Enter your name: "
    },
    {
        name: "opponentName",
        type: "list",
        message: "Select your opponent:",
        choices: ["Skeleton", "Allien", "Zombie"]
    }
])

let {myName, opponentName} = userInput;
console.log(`${chalk.bold.green(myName)} VS ${chalk.bold.red(opponentName)}\n`);

// now make objects from the classes created above

let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);

// while loop starts
while(true) {
    let startMatch = await inquirer.prompt({
        name: "options",
        type: "list",
        message: "Select your option!",
        choices: ["Attack", "Increase Health", "Run for life..."]
    })

    let {options} = startMatch;
    // condition
    if (options === "Attack") attackFun();
    if (options === "Increase Health") increaseHealthFun();
    if (options === "Run for life...") runForLife();

    // attackFun() starts
    function attackFun () {
        // generate random number 0 and 1
        let number = Math.floor(Math.random() * 2);

        // when random number is equal to 0, decrease the fuel of my Player!
        if(number === 0) {
            myPlayer.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`);

            if(myPlayer.fuel === 0) {
                console.log(`Oops ${chalk.bold.red(myPlayer.name)} lost! Better luch next Time.\n`);
                process.exit();
            }
        }

        // when random number is equal to 1, decrease the fuel of opponent!
        if(number === 1) {
            myOpponent.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`);
            
            if (myOpponent.fuel === 0) {
                console.log(`Congragulations ${chalk.bold.green(myPlayer.name)}! You won the game.\n`);
                process.exit();
            }
        }
    }
    // attackFun() ends

    // increaseHealthFun() starts
    function increaseHealthFun() {
        myPlayer.fuelIncrease();
        console.log(`${myPlayer.name}'s fuel is increased to ${chalk.bold.green(myPlayer.fuel)}\n`);
    }
    // increaseHealthFun() ends

    // runForLife() starts
    function runForLife() {
        console.log(`${chalk.bold.red(myPlayer.name)} lost! Better luck next time.`);
        process.exit();
    }
    // runForLife() ends
}







