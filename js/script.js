import { marked } from "https://esm.sh/marked";

function loadMarkdownContent(filePath, elementID) {
    fetch(filePath)
    .then( (response) => {
        if(!response.ok) {
            throw new Error (`## Connection Error`)
        }

        return response.text();
    })

    .then( (response) => {
        let markdownString = response;
        document.getElementById(elementID).innerHTML = marked.parse(markdownString);
    })

    .catch((error) => {
        document.getElementById(elementID).innerHTML = marked.parse(error.message);
    });
}

//Get card information for the main portfolio page
loadMarkdownContent("./markdown-files/main-page/main-card-0.md", "card-content-0");
loadMarkdownContent("./markdown-files/main-page/main-card-1.md", "card-content-1");
loadMarkdownContent("./markdown-files/main-page/main-card-4.md", "card-content-4");
loadMarkdownContent("./markdown-files/main-page/main-card-3.md", "card-content-3");
loadMarkdownContent("./markdown-files/main-page/main-card-5.md", "card-content-5");