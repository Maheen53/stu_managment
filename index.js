#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    static counter = 10000;
    id;
    name;
    cource;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name,
            this.cource = [],
            this.balance = 100;
    }
    // method to enroll student in a course
    enroll_cource(cource) {
        this.cource.push(cource);
    }
    //method view balance
    view_balance() {
        console.log(`balance for ${this.name} ,${this.balance} `);
    }
    //method to pay student fee
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`${amount} payfee sucssesfully ${this.name}`);
    }
    // method to display student
    student_status() {
        console.log(`id:  ${this.id}`);
        console.log(`name: ${this.name}`);
        console.log(`cource : ${this.cource.join(",")}`);
        console.log(`balance: ${this.balance}`);
    }
}
// defining a student managingclass definiga manage student
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    add_student(name) {
        let students = new student(name);
        this.students.push(students);
        console.log(`Student: ${name} added successfully. Student id: ${students.id}`);
    }
    enroll_student(student_id, cource) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_cource(cource);
            console.log(`${student.name} enrolled ${cource} sucssesfully`);
        }
    }
    // method to view balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found please select a valid student id");
        }
    }
    //method to pay fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fee(amount);
        }
        else {
            console.log("student not found please select a valid student id");
        }
    }
    //method to show student stataus
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.student_status;
        }
    }
    //method to find student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run the program
async function main() {
    console.log(chalk.bgRed("\tWELCOME TO STUDENT MANAGMENT SYSTEM with CODING WEB DEVELOPER MAHEEN IMTIAZ\t"));
    console.log("-".repeat(50));
    let studentmanager = new StudentManager();
    //while loop to keep program runinning   
    while (true) {
        let choices = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "please select option",
                choices: [
                    "add student",
                    "enroll cources",
                    "view student balance",
                    "pay fee",
                    "show status",
                    "exit"
                ]
            }
        ]);
        switch (choices.choice) {
            case "add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "enter a student name"
                    }
                ]);
                studentmanager.add_student(name_input.name);
                break;
            case "enroll cources":
                let cource_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter the student id"
                    },
                    {
                        name: "cource",
                        type: "input",
                        message: "enter the cource you enrolled"
                    }
                ]);
                studentmanager.enroll_student(cource_input.student_id, cource_input.cource);
                break;
            case "view student balance":
                let student_balance = await inquirer.prompt([
                    {
                        name: "view",
                        type: "number",
                        message: "enter the student id"
                    }
                ]);
                studentmanager.view_student_balance(student_balance.view);
                break;
            case "pay fee":
                let fees_pay = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter the student id"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter the amount "
                    }
                ]);
                studentmanager.pay_student_fees(fees_pay.student_id, fees_pay.amount);
                break;
            case "show status":
                let show_status = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter the student id"
                    }
                ]);
                studentmanager.show_student_status(show_status.student_id);
                break;
            case "exit":
                console.log("Exsisting...");
                process.exit();
        }
    }
}
main();
