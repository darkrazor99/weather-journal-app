// Personal API Key for OpenWeatherMap API
const apiKey = '9f8945e7a41ea1d94c242c1e45e27c33';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', doWork);
/* Function called by event listener */
function doWork(){

    //  call to api to get data from there?

    // posting data to my server
    postData('/add', {
        temperature: 'test temp',
        date: 'test date',
        userResponse: 'test user response'
    });
    
    // getting data from all
    getData('/all');
    // finally update
}

/* Function to GET Web API Data*/

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
}

/* Function to GET Project Data */
const getData = async(url)=>{
    const response = await fetch(url);
    try {
        const newData = await response.json();
        // console.log(newData); remove me pefore u supmit
        return newData;

    } catch (error) {
        console.log("error", error);
    }
}