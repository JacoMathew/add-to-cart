// Load item template partial to containers
$("#item-template-script-container").load("partials/itemPartial.html",
    function () {
        // after loading, append modalBill.html file
        $.get("partials/modalBill.html",
            function (data) {
                $("#item-template-script-container").append(data);
            }
        );
    });

// Load Header html template to Navbar container
$("#headerNavbar").load("partials/headerPartial.html",
    function () {
        const templateHTMLHeader = $("#header-template").html();
        const compiledHTMLHeader = Handlebars.compile(templateHTMLHeader);
        const compiledObjectHeader = compiledHTMLHeader(_headerItems);
        $("#headerNavbar").html(compiledObjectHeader);
    });

// Load Footer html template to footer
$("#footer").load("partials/footerPartial.html");

let sticky = 0;
// Toggle Product Page and Starter page
$('#headerNavbar').on("click", "#ProductsNav", function () {
    toggleProducts("#Products", ".page1");

    // set the y offset of Product section to do sticky button
    sticky = Math.floor($('#productId-container').offset().top);
});

$('#headerNavbar').on("click", "#AboutNav , #EventsNav", function () {
    toggleProducts(".page1", "#Products");
});

function toggleProducts(showDiv, hideDiv) {
    $(showDiv).show();
    $(hideDiv).hide();
};

// Function to change the active in the header Nav bar
// based on the clicked li tag
$("#headerNavbar").on('click', '.nav-item', function () {
    $(".nav-item").removeClass("active");
    $(this).addClass('active');

    $('#navbarNav').removeClass('show');
});

// Initialising empty cart object

let cart = {};
let total = 0;

// Defining a Class called Cart Item with constructor as object template
class CartItem {
    constructor(name, qty, price, amount) {
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.amount = amount;
    }
}

function toggleCartButton(showDiv, hideDiv) {
    $(showDiv).show();
    $(hideDiv).hide();
};


$('#productId-container').on('click', '.buttonAdd', function () {

    if ($('.modal').attr('id') !== 'ModalBill') {
        $('.modal').attr('id', 'ModalBill');
    }

    var id = $(this).parent().attr('id');
    var element = '#' + id;

    // TODO : Show + and - with a count box in the center but it shows up only afer the first click
    toggleCartButton(element + ' .buttonCluster', element + ' .buttonAdd');

    addToCart(id);

});

$('#productId-container').on('click', '.buttonPlus', function () {

    var id = $(this).parent().parent().attr('id');

    addToCart(id);
});

$('#productId-container').on('click', '.buttonMinus', function () {

    var id = $(this).parent().parent().attr('id');

    lessFromCart(id)
});


function addToCart(id) {
    var textClass = id + 'Product';
    var product = $('.' + textClass).text().trim();
    var qty = 1;
    var price = 99;

    if (!cart.hasOwnProperty(product)) {
        var amount = qty * price;
        cart[product] = new CartItem(product, qty, price, amount);
    } else {
        cart[product].qty++;
        cart[product].amount = cart[product].qty * cart[product].price
        $('#' + id + ' h3').text(cart[product].qty);
    }
    // TODO : Run a for Loop to find the total and save to cart property
    getTotal();
};

// function to less the item in cart
function lessFromCart(id) {
    var textClass = id + 'Product';
    var product = $('.' + textClass).text().trim();

    if (cart[product].qty > 1) {
        cart[product].qty--;
        cart[product].amount = cart[product].qty * cart[product].price
        $('#' + id + ' h3').text(cart[product].qty);
    } else {

        // Delete cart product when the item is reduced to 0
        var element = '#' + id;
        delete cart[product];

        // Toggle card footer buttons when the item is reduced to 0     
        toggleCartButton(element + ' .buttonAdd', element + ' .buttonCluster');

    }
    getTotal();
};

function getTotal() {
    total = 0;
    for (var prop in cart) {
        total += cart[prop].amount;
    };
}

$('#shoppingCart').click(function () {
    if (Object.keys(cart).length !== 0) {
        const templateHTMLTable = $("#modal-body-template").html();
        const compliedHTMLTable = Handlebars.compile(templateHTMLTable);
        const compliedObjectTable = compliedHTMLTable(cart);
        $("#modalBody").html(compliedObjectTable);

        $('#tableTotal').text(total);

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', total.toString())
    } else {
        $('.modal').attr('id', '');
        alert("The Cart is empty!!")
    }
});

// Clear button to reset the product page for fresh order
$('#clearCart').click(function () {
    if (Object.keys(cart).length !== 0) {
        var confirmRes = confirm('Do you want to clear the Cart ?');

        if(confirmRes){
            cart = {};
            total = 0;
            console.log('The cart is cleared')

            toggleCartButton('.card-footer .buttonAdd', '.card-footer .buttonCluster')
            $('.card-footer h3').text('1');
        } else {
            console.log('Cart clearing is cancelled')
        };
    } else {
        alert("The Cart is empty!!")
    }
});

var height = $(window).height();
var width = Math.floor(.80 * $(window).width());

function printCart() {
    // Check if empty show the opened file above the current
    window.open('partials/printTemplate.html', '', `width=${width},height=${height},location=no`)
};

// Alert user of reload or closing of tab
$(window).on('beforeunload', function () {
    return confirm('Are you sure you want to leave the page ?')
});

// TODO: Make the shopping button float
window.onscroll = function() {cartFABtn()};

function cartFABtn() {

  if (window.pageYOffset >= sticky) {
      $('#shoppingCart').addClass("faBtn");
  } else {
      $('#shoppingCart').removeClass("faBtn");
  }
}

// Set up an input with type file and accept to choose a json file
// with s JS object format. This way we can make changes to our object outside 
// of the program and get it up to date.

// When upload button is clicked in the modal
function uploadInventory() {

    // open an file browser dialog

    let file = $("#fileInventory")[0].files[0];

    if (typeof(file) !== 'undefined' && file.type == "application/json") {
        $("#uploadResult").text('Correct file format').css('color','green');

        var fileReader = new FileReader();
        let textOfFile ;
        
        fileReader.onload = (e) => {
            const file = e.target.result;
            console.log(e);
            console.log(e.target);
            console.log(file);
            
            textOfFile = JSON.parse(file);

            $('#uploadedFile').text(file);
        }; 

        fileReader.readAsText(file);

    } else {
        console.log('File is un-defined or you have not chosen a JSON file')
        $("#uploadResult").text('Incorrect file format').css('color','red');
    }    
};




