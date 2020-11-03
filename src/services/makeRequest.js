let mainServerUrl = 'http://localhost:3000';

async function makeRequest(url, options = {}, baseUrl = mainServerUrl){
    try{
        let response = await fetch(baseUrl + url, options);
        if(response.ok){
            return response; 
            //возвращаем просто response, не преобразовывая json(), 
            //т.к. нам нужен весь ответ, с заголовками, а преобразовать к json можно и потом

        }else {
           // console.error("Ошибка http: ", response.status);
            return response.text().then(function(text){
                throw new Error(text);
            });
        }
    }catch
    (err){
        console.error(err)
    }


}
export default makeRequest;
