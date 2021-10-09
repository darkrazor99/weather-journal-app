// Personal API Key for OpenWeatherMap API
const apiKey = '9f8945e7a41ea1d94c242c1e45e27c33';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', doWork);

/* Function called by event listener */
function doWork(){

    const zip = document.getElementById('zip').value;
    let d = new Date();
    // january is 0 
    let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
    const userFeelings = document.getElementById('feelings').value;
    //  call to api to get data from there?
    getApiData(zip)
    .then(function(data){
        // posting data to my server
        postData('/add', {
        temperature: data.list[0].main.temp,
        date: newDate,
        userResponse: userFeelings
        });
        // getting data from all
        getData('/all');
        // finally update
    });
}

/* Function to GET Web API Data*/
const getApiData = async(id) =>{
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKey}`);
    try {
        const apiData = await response.json();
        return apiData;
    } catch (error) {
        console.log('error', error);
    }

};
/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
        
    }
};

/* Function to GET Project Data */
const getData = async(url)=>{
    const response = await fetch(url);
    try {
        const newData = await response.json();
        // remove me pefore u supmit
        console.log(newData); 
        return newData;

    } catch (error) {
        console.log("error", error);
    }
};