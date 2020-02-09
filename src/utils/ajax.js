let ajaxCounter = 0;
const ajaxQueue = {};

const ajaxDefaults = {
    id: null,
    method: 'GET',
    url: '',
    data:{},
    onSuccess() { },
    onError() { },
    always() { },
    allowMultipleRequests: false,
    key: ''
};

const getAjaxDefaults = function () {
    const ajaxData = { ...ajaxDefaults };
    ajaxData.id = ajaxCounter++;
    ajaxData.controller = new AbortController()
    return ajaxData;
};


export function abortAjaxByKey(key) {
    if (ajaxQueue[key]) {        
        ajaxQueue[key].controller.abort();
        delete ajaxQueue[key];
    }
}


function addToAjaxQueue(ajaxData) {
    ajaxQueue[ajaxData.key] = {
        controller: ajaxData.controller,
        url: ajaxData.url,
        id: ajaxData.id
    };
}

export async function ajax(data) {

    const ajaxData = { ...getAjaxDefaults(), ...data };    
    
    if (!ajaxData.allowMultipleRequests) {
        //abort previous requests with the same key (if there are any)
        abortAjaxByKey(ajaxData.key);

        //add ajax call to queue
        addToAjaxQueue(ajaxData);
    }
    let result = null;
    try {

        let url = new URL(ajaxData.url)

        if(ajaxData.method==='GET'){
            url.search = new URLSearchParams(ajaxData.data)  
        }

        const response = await fetch(url, {
            method: ajaxData.method,
            signal: ajaxData.controller.signal,            
            body: ajaxData.method==='GET'?null:JSON.stringify(ajaxData.data)
        });
        const data = await response.json()
        
        if (response.ok) {
            ajaxData.onSuccess(data);  
            result = data;          
        }
        else {
            ajaxData.onError(response);            
        }
    }
    catch (error) {
        console.log(error);
        if (error.name === 'AbortError') {
            return;
        }        
        ajaxData.onError(error);
    }


    if (!ajaxData.allowMultipleRequests) {
        delete ajaxQueue[ajaxData.key];
    }

    return result;

    
}

