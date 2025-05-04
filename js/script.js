import { marked } from "https://esm.sh/marked";

//Get card information for the main portfolio page
fetch("./markdown-files/main-card-0.md")
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById("card-content-0").innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById("card-content-0").innerHTML = marked.parse(error.message);
    });

//Get card information for the 1st portfolio item
fetch("./markdown-files/main-card-1.md")
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById("card-content-1").innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById("card-content-1").innerHTML = marked.parse(error.message);
    });

    //Get card information for the 2nd portfolio item
    fetch("./markdown-files/main-card-2.md")
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById("card-content-2").innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById("card-content-2").innerHTML = marked.parse(error.message);
    });

    //Get card information for the 3rd portfolio item
    fetch("./markdown-files/main-card-3.md")
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById("card-content-3").innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById("card-content-3").innerHTML = marked.parse(error.message);
    });