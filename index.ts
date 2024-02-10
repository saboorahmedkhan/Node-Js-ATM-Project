import inquirer from "inquirer";
import { faker } from '@faker-js/faker';

// Requirements 
// 1) users data
// 2) atm machine
// 3) atn functions

// (1) Users Data

interface User{
    id:number
    pin:number
    name:string
    accountNumber:number
    balance:number
}

const createUser = ()=>{
    let users:User[] = []

    for (let i = 0; i<5; i++){
        let user:User = {
            id:i,
            pin:1000 + i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(100000000 * Math.random()*900000000),
            balance:1000000 * i,
        };

        users.push(user);
    };

    return users;
};

// (2) ATM Machine

const atmMachine = async (users:User[]) => {

    const res = await inquirer.prompt({
        type:"number",
        message:"write pin code",
        name:"pin"
    })
    

    const user = users.find(val => val.pin == res.pin)

    if(user){
        console.log(`Wellcome ${user.name}`);
        atmFunc(user)
        return
    }
    console.log("Invalid user pin")

}

// ATM functions

const atmFunc = async(user:User) => {
    const ans = await inquirer.prompt({
        type:"list",
        name:"select",
        message:"Select your options ",
        choices:["Widdraw","Balance","Deposite","Exit"]
    })
    if(ans.select == "Widdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message:"enter amount",
            name:"rupees"
        })
        if(amount.rupees > user.balance){
            return console.log("insufficient balance")
        }
        if(amount.rupees > 25000){
            return console.log("You cannot widdarw above Rs:25000")
        }
        console.log(`Balance Amount: ${user.balance}`)
        console.log(`Widdraw amount: ${amount.rupees}`)
        console.log(`New Balance : ${user.balance - amount.rupees}`)

    }
    if(ans.select == "Balance"){
        console.log(`Balance : ${user.balance}`)
    }
    if(ans.select == "Deposite"){
        const deposite = await inquirer.prompt({
            type:"number",
            message:"Enter Deposite Amount",
            name:"rupees"
        })
        console.log(`Deposite amount: ${deposite.rupees}`)
        console.log(`Previous Balance: ${user.balance}`)
        console.log(`New Balance: ${user.balance + deposite.rupees}`)
    }
    if(ans.select == "Exit"){
        console.log("Thanks for using ATM")
    }
}

const users = createUser();

atmMachine(users)

