// Personal API Key for OpenWeatherMap API
const apiKey = '9f8945e7a41ea1d94c242c1e45e27c33';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', doWork);

/* Function called by event listener */
async function doWork(){

    const zip = document.getElementById('zip').value;
    
    if(!zip) {
        alert('please enter a zip code');
    } else {
        // get the date today
        let d = new Date();
        // january is 0 
        let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
        
        // get user input
        const userFeelings = document.getElementById('feelings').value;
        
        //  call to api to get temp from there
        // then post it and then update ui
        getApiData(zip)
        .then(function(data){
            // posting data to my server
            return postData('/add', {
            temperature: data.main.temp,
            date: newDate,
            userResponse: userFeelings
            });
        }).then(updateUi);

    }
    
}

/* Function to GET Web API Data*/
const getApiData = async(zip) =>{
    // api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`);
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
        return response;
    } catch (error) {
        console.log("error", error);
        
    }
};

/* Function to GET Project Data */
const updateUi = async()=>{
    const response = await fetch('/all');
    try {
        const newData = await response.json();

        document.getElementById('date').innerHTML=newData.date;
        document.getElementById('temp').innerHTML=newData.temperature;
        document.getElementById('content').innerHTML=newData.userResponse; 
        return newData;

    } catch (error) {
        console.log("error", error);
    }
};