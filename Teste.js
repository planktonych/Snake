let speed = 910
let color = "red";

if(speed<80) /*conditions*/
{
    if(speed<50)
    {
        console.log("roule plus vite bordel")
    }
    else
    {
        console.log("bien!!!!")
    }
    console.log("tu roule a la bonne vitesse!")
}
else if(speed<100)
{
    alert("tu doit ralentir")
}
else
{
   alert("tes un fout")
}

switch(color) /*switch*/
{
    case "blue":
     console.log("wouahhhh c blue");
        break;
    case "red":
        console.log("ahhhh du sang");
        break;

        default:
            console.log("je ne c pas")
}

var number = 0; /*loops*/

do
{
    console.log(number);
    number++;
}

while(number>0 && number<7)

for(let number = 0; number < 5; number++)
{
    console.log("number")
} 
   

function multiply(number1, number2, number3)/*fonction*/
{
       return number1*number2*number3;
}

let a = 5;
let b = 6;

let result = multiply(a,b,a);/*5*6*5*/

console.log(result);


let fruit = ["pomme", "orange", "banane", "citron"]; /*array (tableau)*/

for(let i = 0; i<3 ; i++)
console.log(fruit[i]);

let myarray = [[0.1],[5,7,8],[12,18]];   

console.log(myarray[2][1]);


let dog = /*object*/
{
    name:"choupette",
    color:"white",
    age:"4",

};
console.log(dog.name);
for (let property in dog)
{
    console.log(dog[property]);
}

let cat  = new Object();
cat.name = "choupe";
cat.color = "black";
cat.age = 5;
cat.miolé = function(number)
{
    while(number>0)
    {
        console.log(number.toString() + "miaou miaou");
        number--;
    }
};

cat.miolé(5);

function dogs(name, color, age) /*fonctions constructeurs*/
{
    this.name = name;
    this.color = color;
    this.age = age;
    this.aboie = function()
    {
        console.log("wouaff", this.name);
    }
}

let staff = new dogs("hercule", "grey", 4);
let chiwawa = new dogs("walie", "white", 7);

console.log(staff);
console.log(chiwawa);

chiwawa.aboie();
staff.aboie();