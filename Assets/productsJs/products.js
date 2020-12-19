const _alphabets =
[
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
]

const _numbers =
[
    1,2,3,4,5,6,7,8,9,10
]

Handlebars.registerHelper('serialise' , function(index){
    return index + 1;
})

const templateHTML = $("#item-template").html();
const compliedAlphaHTML = Handlebars.compile(templateHTML);
const compliedAlphaObject = compliedAlphaHTML(_alphabets);
$("#alphabets-container").html(compliedAlphaObject);

const templateNumberHTML = $("#item-template").html();
const compliedNumberHTML = Handlebars.compile(templateHTML);
const compliedNumberObject = compliedNumberHTML(_numbers);
$("#numbers-container").html(compliedNumberObject);
