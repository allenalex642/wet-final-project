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
