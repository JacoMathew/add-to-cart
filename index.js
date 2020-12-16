// Load item template partial to containers
$("#item-template-script-container").load("partials/itemPartial.html",
function () {
    $.get("partials/modalBill.html",
        function (data) {
            $("#item-template-script-container").append(data);
        }   
    );
  })

// Load Header html template to Navbar container
$("#headerNavbar").load("partials/headerPartial.html",
  function() {
    const templateHTMLHeader = $("#header-template").html();
    const compliedHTMLHeader = Handlebars.compile(templateHTMLHeader);
    const compliedObjectHeader = compliedHTMLHeader(_headerItems);
    $("#headerNavbar").html(compliedObjectHeader);
});

// Load Footer html template to footer
$("#footer").load("partials/footerPartial.html");


// Toggle Product Page and Starter page
$('#headerNavbar').on("click", "#ProductsNav", function() {
    toggleProducts("#Products", ".page1");
});

$('#headerNavbar').on("click", "#AboutNav , #EventsNav", function() {
    toggleProducts(".page1", "#Products");
});

function toggleProducts(showDiv, hideDiv){
    $(showDiv).show();
    $(hideDiv).hide();
};

// Function to change the active in the header Nav bar
// based on the clicked li tag
$("#headerNavbar").on( 'click','.nav-item' , function() {
    $(".nav-item").removeClass("active");
    $(this).addClass('active');
  });

// Initialising empty cart object

let cart = {};

// Defining a Class called Cart Item with constructor as template
class CartItem {
    constructor(name, qty, price) {
        this.name = name;
        this.qty = qty;
        this.price = price;
    }
}

$('#productId-container').on('click', '.buttonAdd', function(){
    var id = $(this).attr('id');
    var textClass = id +'Product';
    var product = $('.'+ textClass).text().trim();
    var qty = 1;
    var price = 99;
    console.log(product)
    console.log(cart)

    addToCart(product, qty, price);

    
} );


function addToCart(product, qty, price){
    if(!cart.hasOwnProperty(product)){
        cart[product] = new CartItem(product, qty, price);
        console.log(cart)
    } else{
        cart[product].qty ++;
    }
};

$('#shoppingCart').click(function () { 
    console.log('Shopping Cart Clicked');
    const templateHTMLTable = $("#modal-body-template").html();
    const compliedHTMLTable = Handlebars.compile(templateHTMLTable);
    const compliedObjectTable = compliedHTMLTable(cart);
    $("#modalBody").html(compliedObjectTable);
    
});