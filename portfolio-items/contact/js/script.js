//Function for form validation
$(function () {

    $('#form').validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
            if (element.attr("name") == "phone") {
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
            contact_type: {
                required: true,
            },
            issue: {
                required: true
            },
            description: {
                required: true,
                minlength: 40
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
            contact_type: {
                required: "Please select a method of contact"
            },
            issue: {
                required: "Please choose an issue"
            },
            description: {
                required: "Please give more information about the issue you encountered",
                minlength: "You must have at least 40 characters in this field"
            }
        }

    });
});