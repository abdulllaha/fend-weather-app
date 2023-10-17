/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const requestForm = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid=";
const apiKey = "f2d725e660954838f810e26c85f42216&units=imperial";
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');
const generate = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const fetchWeather = async (url = '') => {
    const response = await fetch(url); 
    try {
        const data = await response.json();
        if(data.cod == 200){
            return data;   
        }else
        console.log(data.message);
    }
    catch(error) {
        console.log(`error is ${error}`);
    }
};

const filterData = async(data) => {
    try {
        if(data.cod == 200){
            const filterdData = {
                date: newDate,
                content: feelings.value,
                temp: data.main.temp
            }
            return filterdData;
        }
        else {
            const filterdData = {
                date: newDate,
                content: feelings.value,
                temp: 'the external service is down'
            }
            return filterdData;
        }
    } catch(error){
        console.log(`error ${error}`);
    }
};
const post = async(url = '', data= {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    }catch (err) {
        console.error(err);
    }
};

const retrieve = async(url = '') => {
    const data = await fetch(url);
    try {
        const response = data.json();
        return response;
    }
    catch(error) {
        console.log(`error ${error}`);
    }
};
const updateUi = async (data) => {
    const respone = await data;
    try {
        date.innerHTML = respone.date;
        temp.innerHTML = respone.temp;
        content.innerHTML = respone.content;
    }catch(error) {
        console.log(`error ${error}`);
    }   
};
generate.addEventListener('click',  (event) => {
    event.preventDefault();
    const url = `${baseURL}${zip.value}&appid=${apiKey}`;
    fetchWeather(url).then((data) => {
        filterData(data).then((filteredData) => {
            post('/post', filteredData).then((res)=> {
                retrieve('/retrieve').then((data) => {
                    updateUi(data);
                });
            });
        });
    });
});