import { formatDataToFetch } from './formatData.js';
//import { htmlDOMFunctions } from './setFunctionDOM.js'


//const htmlDOMFunction = htmlDOMFunctions
//const responseView = responseViews

const urlHooks = {
    createrow: async (allElements) => {
        try {
            const htmlData = formatDataToFetch.makeObject(allElements)
            console.log(htmlData)
            const data = JSON.stringify(htmlData);
            console.log('im data ************************')
            console.log(data)
            const fetchsettings = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data };
            console.log(fetchsettings)
            let responsefetch = await fetch("http://localhost:8080/api/product/create", fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            console.log(json);
        }
        catch (error) {
            console.log(error.message);
            //browsermessage.show(error);
        }
    },

    selectRowByCode: async (allElements) => {
        try {
            const htmlData = formatDataToFetch.makeObject(allElements)
            const fetchsettings = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            let responsefetch = await fetch(`http://localhost:8080/api/product/${htmlData[0].column_one.value}`, fetchsettings);
            if (responsefetch.ok) {
                const json = await responsefetch.json();
                return json
                //htmlDOMFunction.showSearch(json, allElements)
            } else {
                console.log(responsefetch)
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
        }
        catch (error) {
            console.log(error.message);
            //browsermessage.show(error);
        }
    },

    selectAllRows: async () => {
        try {
            const fetchsettings = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            let responsefetch = await fetch("http://localhost:8080/api/product/all", fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            return json
        }
        catch (error) {
            console.log(error.message);
            //browsermessage.show(error);
        }
    },

    deleteRowByCode: async (allElements) => {
        try {
            const htmlData = formatDataToFetch.makeObject(allElements)
            const fetchsettings = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            let responsefetch = await fetch(`http://localhost:8080/api/product/delete/${htmlData[0].column_one.value}`, fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            } else {
                const json = await responsefetch.json();
                console.log(json);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    },

    updateRowByCode: async (allElements) => {
        try {
            const htmlData = formatDataToFetch.makeObject(allElements)
            const data = JSON.stringify(htmlData);
            const fetchsettings = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data };
            let responsefetch = await fetch(`http://localhost:8080/api/product/update/${htmlData[0].column_one.value}`, fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            console.log(json);
        }
        catch (error) {
            console.log(error.message);
            //browsermessage.show(error);
        }
    },

    totalizeSales: async (allElements) => {
        //console.log(reloadTableItem)
        try {
            const htmlData = formatDataToFetch.groupSales(allElements)
            const data = JSON.stringify(htmlData);
            const fetchsettings = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data };
            let responsefetch = await fetch("http://localhost:8080/api/sales/saleconfirmed", fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
        }
        catch (error) {
            //browsermessage.show(error);
        }
    },

    massiveDataInsert: async (fileCsv) => {
        try {
            //const fetchsettings = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: fileCsv };
            const fetchsettings = { method: 'POST', body: fileCsv };
            let responsefetch = await fetch("http://localhost:8080/api/product/masivecreate", fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            console.log(json);
        }
        catch (error) {
            console.log(error.message);
            //browsermessage.show(error);
        }
    },

    downloadCsvData: async () => {
        try {
            const fetchsettings = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
            let responsefetch = await fetch("http://localhost:8080/api/product/product/csv", fetchsettings);
            if (!responsefetch.ok) {
                throw new Error(`Response status from fetch: ${responsefetch.status}`);
            }
            const json = await responsefetch.json();
            return json
        }
        catch (error) {

        }
    }
}

export { urlHooks };
