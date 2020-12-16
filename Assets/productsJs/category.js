const _product = {
    category:
        [{
            sectionId: "Alphabets",
            category: "Alphabets",
            divId: "alphabets-container",
        },
        {
            sectionId: "Numbers",
            category: "Numbers",
            divId: "numbers-container",
        },
        // {
        //     sectionId: "AlphaNumeric",
        //     category: "Alpha Numeric",
        //     divId: "alphaNumeric-container",
        // }
        ]
};

$(document).ready(function () {

    const templateHTML = $("#products-template").html();
    const compliedHTML = Handlebars.compile(templateHTML);
    const compliedObject = compliedHTML(_product);
    $("#productId-container").html(compliedObject);
    
});
