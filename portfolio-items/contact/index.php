<?php
// check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // email processing script
    $to = '24532763@nwtc.edu';  // use your own email address
    $subject = 'Contact Form';
    // list expected fields
    $expected = ['firstname', 'lastname', 'email', 'phonenumber', 'contact_type', 'issue', 'description'];
    $required =  ['firstname', 'lastname', 'email', 'phonenumber', 'contact_type', 'issue', 'description'];

    // create additional headers
    $headers[] = 'From: Contact Form<24532763@nwtc.edu>';
    $headers[] = 'Content-Type: text/plain; charset=utf-8';

        // pattern to locate suspect phrases
    $pattern = '/[\s\r\n]|Content-Type:|Bcc:|Cc:/i';
    // check the submitted email address
    $suspect = preg_match($pattern, $_POST['email']);

    if (!$suspect) {
        foreach ($_POST as $key => $value) {
            // strip whitespace from $value if not an array
            if (!is_array($value)) {
                $value = trim($value);
            }
            if (!in_array($key, $expected)) {
                // ignore the value, it's not in $expected
                continue;
            }
            if (in_array($key, $required) && empty($value)) {
                // required value is missing
                $missing[] = $key;
                $$key = "";
                continue;
            }
            $$key = $value;
        }
    }
    // validate the user's email
    if (!$suspect && !empty($email)) {
        $validemail = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        if ($validemail) {
            $headers[] = "Reply-To: $validemail";
        } else {
            $errors['email'] = true;
        }
    }
    $mailSent = false;
    // go ahead only if not suspect, all required fields OK, and no errors
    if (!$suspect && !$missing && !$errors) {
        // initialize the $message variable
        $message = '';
        // loop through the $expected array
        foreach ($expected as $item) {
            // assign the value of the current item to $val
            if (isset($$item) && !empty($$item)) {
                $val = $$item;
            } else {
                // if it has no value, assign 'Not selected'
                $val = 'Not selected';
            }
            // if an array, expand as comma-separated string
            if (is_array($val)) {
                $val = implode(', ', $val);
            }
            // replace underscores in the label with spaces
            $item = str_replace('_', ' ', $item);
            // add label and value to the message body
            $message .= ucfirst($item) . ": $val\r\n\r\n";
        }
        // limit line length to 70 characters
        $message = wordwrap($message, 70);
        // format headers as a single string
        $headers = implode("\r\n", $headers);
        $mailSent = mail($to, $subject, $message, $headers);
        if (!$mailSent) {
            $errors['mailfail'] = true;
        }
    }

    if ($mailSent) {
        header('Location: thank-you.php');
        exit;
    }   
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="../../../../css/style.css">
        <script type="module" src="./js/script.js"></script>
        <title>Contact Form</title>
    </head>
    <body class="grid-12">
        <h1>Contact Form</h1>
        <nav class="nav">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="../../index.html">Portfolio Home</a>
                </li>
                <li class="nav-item">
                    <a href="../nav-collection/index.html">Navigation Bar Collection</a>
                </li>
                <li class="nav-item">
                    <a href="../card-collection/index.html">Card Content Collection</a>
                </li>
                <li class="nav-item">
                    <a href="index.html">Contact Form</a>
                </li>
                <li class="nav-item">
                    <a href="../dev-notes/index.html">Dev Thoughts</a>
                </li>
            </ul>
        </nav>
        <h2>Contact Us</h2>
                    <form novalidate="novalidate" id="form" method="post">
                <ol>
                    <li>
                        <label for="firstname">First Name</label>
                        <input type="text" id="firstname" name="firstname">
                    </li>
                    <li>
                        <label for="lastname">Last Name</label>
                        <input type="text" id="lastname" name="lastname">
                    </li>
                </ol>
                    <fieldset class="absolute">
                        <legend>Please enter the following information</legend>
                        <ol>
                            <li>
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="email">
                            </li>
                            <li>
                                <label for="phonenumber">Phone Number*</label>
                                <input type="number" id="phonenumber" name="phonenumber">
                            </li>
                        </ol>
                        <p>
                            <label>How should we contact you?</label>
                            <input type="radio" id="phone" value="phone" name="contact_type">
                            <label for="phone">Phone</label>
                            <input type="radio" id="emailAddress" value="emailAddress" name="contact_type">
                            <label for="emailAddress">Email</label>
                        </p>
                    </fieldset>
                <ol>
                    <li>
                        <label for="issue">Let Us Know What's Wrong</label>
                        <select id="issue" name="issue" title="Please Select Your Issue">
                            <option value="">Select...</option>
                            <option value="brokenHTML">Broken HTML</option>
                            <option value="cssOverlap">CSS Overlap</option>
                            <option value="cssMobile">Mobile CSS Issues</option>
                            <option value="brokenJS">Unintentional JavaScript Effects</option>
                            <option value="brokenLink">Broken Link(s)</option>
                            <option value="other">Other</option>
                        </select>
                    </li>
                    <li>
                        <label for="description">Please describe in detail what issue you have encountered, as well as where the issue was discovered.</label>
                        <textarea id="description" name="description" rows="5" cols="64"></textarea>
                    </li>
                    <li>
                        <input class="submit" type="submit" value="Submit">
                    </li>
                </ol>
                <p>*Enter the number in the assumed format, 1-XXX-XXX-XXXX</p>
            </form>
        <footer>
            <a href="../../../../../index.html">© 2025 - Alex Allen</a>
            <a class="css-validation-link" href="javascript:void(location='https://jigsaw.w3.org/css-validator/validator?uri='+escape(location))">CSS</a>
            <a class="html-validation-link" href="javascript:void(location='https://validator.w3.org/nu/?doc='+escape(location))">HTML</a>   
        </footer>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.20.0/jquery.validate.min.js" integrity="sha512-WMEKGZ7L5LWgaPeJtw9MBM4i5w5OSBlSjTjCtSnvFJGSVD26gE5+Td12qN5pvWXhuWaWcVwF++F7aqu9cvqP0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    </body>
</html>