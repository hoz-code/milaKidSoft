import { getHTMLElements } from './tools/getHTMLElements.js'
import { urlHooks } from './tools/urlHooks.js';
import { htmlFunctions } from './tools/htmlFunctions.js';
import { cssFunctions } from './tools/cssfunctions.js';
//import { htmlgetDOMData } from './setFunctionGetDOMinfo.js'

const htmlFunction = htmlFunctions
const cssFunction = cssFunctions
const getHTMLElement = getHTMLElements();
const urlHook = urlHooks
const now = new Date()



const populateItemTable = async () => {
    const data = await urlHook.selectAllRows();
    getHTMLElement['available-body-table-products'].innerHTML = ""
    //console.log(data)
    htmlFunction.populateTable(data, getHTMLElements())
}


getHTMLElement['body'].onload = async () => {
    populateItemTable()
}



// Fetch Functions
getHTMLElement['button-search'].onclick = async () => {
    const data = await urlHook.selectRowByCode(getHTMLElements());
    htmlFunction.showSearch(data, getHTMLElements())
}

getHTMLElement['button-save'].onclick = () => urlHook.createrow(getHTMLElements());
getHTMLElement['button-delete'].onclick = () => urlHook.deleteRowByCode(getHTMLElements());
getHTMLElement['button-update'].onclick = () => urlHook.updateRowByCode(getHTMLElements());


getHTMLElement['button-confirm'].onclick = () => {
    urlHook.totalizeSales(getHTMLElements());
    //htmlFunctions.radioBehavior(getHTMLElements())
    setTimeout(() => { htmlFunction.saleclean(getHTMLElements()) }, 250)
    setTimeout(() => { populateItemTable() }, 500)
}

// DOM Functions
getHTMLElement['button-saleclean'].onclick = () => htmlFunction.saleclean(getHTMLElements());


getHTMLElement['button-uploadfile'].onclick = () => {
    const fileCsv = htmlFunction.getFileContent(getHTMLElements());
    console.log('I was Clicked')
    console.log(fileCsv)
    urlHook.massiveDataInsert(fileCsv)
}

getHTMLElement['button-downloadfile'].onclick = () => urlHook.downloadCsvData();

//CSS Function
getHTMLElement['search-box'].onkeyup = () => cssFunction.searchFilter()


