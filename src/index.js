import regeneratorRuntime from "regenerator-runtime";

  const title = document.createElement('h1');
  title.innerHTML = 'PlantSearcher';
  
  const description = document.createElement('p');
  description.innerHTML = "PlantSearcher est un moteur de recherche référencant des milliers de plantes";
  
  const input_value = document.createElement('input');
  input_value.setAttribute('type', 'text');
  input_value.setAttribute('onclick', 'search()');

  const button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.setAttribute('id', 'buttid');
  button.value = 'Chercher';

  document.body.appendChild(title);
  document.body.appendChild(description); 
  document.body.appendChild(input_value);
  document.body.appendChild(button);

  let requestURL = 'https://trefle.io/api/v1/plants/search?token=Fh5DUrCLASPWC00uquG6RhbQ3uluXJw5wSNyjyqU1Xs&q=dandelion&limit=5';
  
  const fetch = require('node-fetch');

  (async () => {
    const response = await fetch(requestURL);
    const myjson = await response.json();
    
    let text = '';
    for(let i=0; i<myjson.data.length; i++){
      text += "<a href=''> "+myjson.data[i].common_name+"</a><br><img height='300' src='"+myjson.data[i].image_url+"'><br>";
    }

    const plant = document.createElement('h2');
    plant.innerHTML = text; 

    document.body.appendChild(plant);
  })();

 function search(){
    let buttvalue = document.getElementById('buttid').value;
 }