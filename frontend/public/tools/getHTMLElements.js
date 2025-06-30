export const getHTMLElements = () => {
    const allElementsHtml = document.querySelectorAll('*');
    const elementsHtml = {};
    for (let i = 0; i < allElementsHtml.length; i++) {
        if (allElementsHtml[i].id) {
            elementsHtml[allElementsHtml[i].id] = allElementsHtml[i];
        }
    }
    return elementsHtml;
};