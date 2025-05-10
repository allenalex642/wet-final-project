import { marked } from "https://esm.sh/marked";

//Get card information for the 1st portfolio item
fetch("./../../markdown-files/contact-form.md")
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById("content").innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById("content").innerHTML = marked.parse(error.message);
    });

$(function () {

    $('#form').validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
            if (element.attr("name") == "colors[]"
                || element.attr("name") == "phone") {
                error.prependTo(element.parent());
            }
        },
        success: function(label) {
            label.parent().removeClass("error-parent");
        },
        highlight: function(element, errorClass) {
            $(element).parent().addClass("error-parent");
            $(element).parent().find(".error").fadeOut(function() {
                $(this).fadeIn();
            });
        },
        rules: {
            firstname: {
                required: true,
                minlength: 2
            }, 
            lastname: {
                required: true,
                minlength: 2
            }, 
            email: {
                required: true,
                minlength: 4
            },
            phonenumber: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            phone: {
                required: true,
            },
            'colors[]': {
                required: true,
                minlength: 2,
                maxlength: 2
            },
            interest: {
                required: true
            },
            fact: {
                required: true,
                minlength: 10
            }
            
        },
        messages: {
            firstname: {
                required: "Enter your first name",
                minlength: "Enter a valid first name, or a nickname others use"
            },
            lastname: {
                required: "Enter your last name",
                minlength: "Enter a valid last name, or use your middle name if preferred"
            },
            email: {
                required: "Please enter an email address",
                minlength: "Enter a valid email address"
            },
            phonenumber: {
                required: "Please enter your phone number",
                minlength: "Enter a phone number in the correct format"
            },
            phone: {
                required: "Please select a method of contact"
            },
            'colors[]': {
                required: "Please choose 2 colors",
                minlength: "You must choose 2 colors"
            },
            interest: {
                required: "Please choose an interest area"
            },
            fact: {
                required: "Please say something else about yourself",
                minlength: "You must have at least 10 characters in this field"
            }
        }

    });
});