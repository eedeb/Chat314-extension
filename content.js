const chat314container = document.createElement("div");
chat314container.innerHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        #chat314-main {
            position: absolute;
            display: block;
            text-align: center;
            max-width: 200px;
            padding: 20px;
            background-color: rgba(0, 0, 0);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        input[type="text"], input[type="password"] {
            width: 70%;
            padding: 10px;
            font-size: 16px;
            color: rgba(52, 182, 255);
            border: 1px solid rgba(52, 182, 255);
            border-radius: 5px;
            margin-bottom: 0px;
            background-color: rgba(0, 0, 0);
            text-align: center;
            cursor: pointer;
        }

        input[type="submit"] {
            padding: 10px 20px;
            font-size: 16px;
            background-color: rgba(0, 0, 0);
            color: rgba(52, 182, 355);
            border: 1px solid rgba(52, 182, 255);
            border-radius: 5px;
            cursor: pointer;
        }

        input[type="text"]:hover, input[type="password"]:hover {
            background-color: rgba(52, 182, 255, 0.2);
            transform: scale(1);
        }

        input[type="submit"]:hover {
            background-color: rgba(52, 182, 255, 0.5);
            transform: scale(1.05);
        }

        #chat314-responses {
            color: rgb(170, 164, 164);
            margin-top: 20px;
            text-align: center;
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
        }
        
        #chat314-responses botoutput {
            font-size: 16px;
            display: block;
            margin: 1em 0;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0);
            color: rgba(52, 182, 255);
            border-radius: 5px;
        }

        #chat314-responses p {
            font-size: 16px;
            text-align: right;
            margin: 10px 0;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0);
            color: rgba(255, 255, 255);
            border-radius: 5px;
        }

        .chat314-btn {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(52, 182, 255);
            padding: 0px 0px;
            font-size: 20px;
            border: 2px solid rgba(52, 182, 255);
            border-radius: 5px;
            color: rgba(52, 182, 255);
            text-decoration: none;
            display: inline-block;
            background-color: rgba(0, 0, 0);
            transition: background-color 0.3s ease, transform 0.2s ease;
            cursor: pointer;
        }
        .chat314-icon img {
            width: 50px;
            height: auto;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .chat314-btn:hover {
            background-color: rgba(52, 182, 255, 0.5);
            transform: scale(1.05);
        }

        @media screen and (max-width: 600px) {
            #chat314-responses p{
                font-size: 16px;
            }

            #chat314-responses botoutput{
                font-size: 16px;
            }

            chat314-input[type="text"], input[type="password"] {
                width: 60%;
                text-align: center;
            }
        }
    </style>
</head>

<body>

    <a class="chat314-btn" id="show" href="javascript:void(0);" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <div class="chat314-icon">
            <img src="https://raw.githubusercontent.com/Mrpi314tech/Home-web/main/logo.png" alt="Show Widget">
        </div>
    </a>

    <div id="chat314-main" style="display: none; position: fixed; bottom: 80px; right: 20px;">


        <a class="chat314-btn" href="https://app.chat314.com/reset">
            <div class="chat314-icon">
                <img src="https://raw.githubusercontent.com/Mrpi314tech/Mrpi314tech.github.io/refs/heads/main/edit-icon.png" alt="Reset">
            </div>
        </a>
        <a class="chat314-btn" id="signout">
        <div class="chat314-icon">
                <img src="https://raw.githubusercontent.com/eedeb/eedeb.github.io/refs/heads/main/signout.png" alt="Signout">
            </div>
        </a>
        <div id="chat314-responses">
            Responses appear here
        </div>

        <br><br><br>

        <form id="api-key-form">
            <input type="password" name="api_key" placeholder="Enter your api key">
            <input type="submit" value="Submit">
        </form>


        <form id="chat-form" style="display: none;">
            <input type="text" name="user_input" placeholder="Talk to Chat314">
            <input type="submit" value="Send">
        </form>
    </div>
</body>

</html>
`;
chat314container.style.position = "relative";
chat314container.style.zIndex = "9999";

// Insert at the beginning of the page
document.body.prepend(chat314container);

$(document).ready(function () {
    $('#show').click(function (event) {
        event.preventDefault();
        $('#chat314-main').toggle();
    });

    // Handle API key retrieval and submission
    var apiKeyCookie = localStorage.getItem('apiKey');
    if (apiKeyCookie) {
        // If the API key exists, hide the API key form and show the chat form
        $('#api-key-form').hide();
        $('#chat-form').show();
    } else {
        // Otherwise, show the API key form
        $('#api-key-form').show();
    }

    // Handle API key form submission
    $('#api-key-form').submit(function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        var apiKey = $('input[name="api_key"]').val(); // Get the API key from the form
        localStorage.setItem('apiKey', apiKey); // Store it in localStorage

        // Hide the API key form and show the chat form
        $('#api-key-form').hide();
        $('#chat-form').show();
    });
    $('#signout').click(function(){
        signout()
    });
    // Handle chat form submission
    $('#chat-form').submit(function (event) {
        event.preventDefault();


        // Get the API key from localStorage
        var apiKeyCookie = localStorage.getItem('apiKey');
        var requestUrl = 'https://app.chat314.com/js_get_response/' + encodeURIComponent(apiKeyCookie);
        var currentUrl = window.location.hostname;
        var updatedInput = " site:" + currentUrl;
        var formData = $(this).serialize();
        formData += ' ' + encodeURIComponent(updatedInput);
        $('input[name="user_input"]').val('Thinking...');
        $.ajax({
            type: 'POST',
            url: requestUrl,
            data: formData,
            success: function (data) {
                $('input[name="user_input"]').val('');
                // Clear the chat314-responses container
                $('#chat314-responses').html('');

                // Parse the chat314-responses into arrays
                var response1 = JSON.parse(data.response_1 || '[]');
                var response2 = JSON.parse(data.response_2 || '[]');
                var response3 = JSON.parse(data.response_3 || '[]');

                // Determine the maximum length of the arrays
                var maxLength = Math.max(response1.length, response2.length, response3.length);

                // Iterate through each index
                for (var i = 0; i < maxLength; i++) {
                    if (response2[i]) {
                        $('#chat314-responses').prepend('<botoutput>' + makeLinksClickable(response2[i]) + '</botoutput>');
                    }
                    if (response1[i]) {
                        $('#chat314-responses').prepend('<botoutput>' + makeLinksClickable(response1[i]) + '</botoutput>');
                    }
                    if (response3[i]) {
                        $('#chat314-responses').prepend('<p>' + makeLinksClickable(response3[i]) + '</p>');
                    }
                }

                autoScroll(); // Scroll to the bottom after updating the chat314-responses
            },
            error: function (xhr, status, error) {
                console.error(error);
                $('input[name="user_input"]').val(originalinput);
                alert('There was an error while processing your input. Please try again.');
            }
        });
    });

    function autoScroll() {
        // Scrolls the entire page to the bottom
        document.getElementById("chat314-responses").scrollTo({
            top: document.getElementById("chat314-responses").scrollHeight,
            behavior: "smooth"
        });
    }

    function makeLinksClickable(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank">[]</a>';
        });
    }
    function signout() {
        alert('Signing out')
        localStorage.removeItem('apiKey');
    }
    function replaceCenterImageIfNeeded(text) {
        var urlRegex = /(https?:\/\/oaidalleapiprodscus\.blob\.core\.windows\.net[^\s]+)/g;
        var match = text.match(urlRegex);
        if (match && match[0]) {
            $('.Chat314-images img:nth-child(1)').attr('src', match[0]);
        }
    }
});
