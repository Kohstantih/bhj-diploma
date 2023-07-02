/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let err = null;
    const xhr = new XMLHttpRequest();
    xhr.responseType = options.responseType;
    
    try {
        if (options.method === 'GET') {
            
        if(options.url === '/transaction') {
            xhr.open('GET', `/transaction?account_id=${options.data}`)
        }  else {
            xhr.open('GET', `${options.url}?mail=${options.data.email}&password=${options.data.password}`)
        }                        
            xhr.send();
        } else {
            xhr.open(options.method, options.url)
            xhr.send(options.data)
        }        
    }
    catch (error) {
        err = error;
        return err    
    }

    xhr.addEventListener('load', () => {
        options.callback(err , xhr.response)       
    })
}