import regeneratorRuntime from "regenerator-runtime";

  const title = document.createElement('h1');
  title.innerHTML = 'PlantSearcher';
  
  const description = document.createElement('p');
  description.innerHTML = "PlantSearcher est un moteur de recherche référencant des milliers de plantes";
 
  let token = 'Fh5DUrCLASPWC00uquG6RhbQ3uluXJw5wSNyjyqU1Xs';

  const input_value = document.createElement('input');
  input_value.setAttribute('type', 'text');
  input_value.setAttribute('id', 'input_id');

  const button = document.createElement('input');
  button.setAttribute('type', 'button');
  button.setAttribute('id', 'buttid');
  button.addEventListener("click", search);
  button.value = 'Chercher';

  const plant = document.createElement('h2');
  plant.setAttribute('id', 'result');

  document.body.appendChild(title);
  document.body.appendChild(description); 
  document.body.appendChild(input_value);
  document.body.appendChild(button);
  document.body.appendChild(plant);

 function search(){
    const plant = document.createElement('h2');
    plant.setAttribute('id', 'result');

    let butt = document.getElementById('input_id').value;

    let requestURL = 'https://trefle.io/api/v1/plants/search?token='+token+'&q='+butt+'&limit=5';
  
    const fetch = require('node-fetch');
  
    (async () => {
      const response = await fetch(requestURL);
      const myjson = await response.json();
      
      let text = '';
      for(let i=0; i<myjson.data.length; i++){
        if(myjson.data[i].image_url == null){
            let nophoto = "http://placehold.jp/808080/ffffff/400x300.png?text=Pas%20d'image%20pour%20cette%20plante%20%3A%2F"
          text += "<a href=''> "+myjson.data[i].common_name+"</a><br><img src="+nophoto+"+>";
        }else{
          text += "<a href=''> "+myjson.data[i].common_name+"</a><br><img height='300' src='"+myjson.data[i].image_url+"'><br>";
        }
        text += "<input type='button' id='plant"+i+"' value='En savoir plus'><br>";
      }

      plant.innerHTML = text; 
  
      document.body.removeChild(document.getElementById('result'));
      document.body.appendChild(plant);
    })();
 }

function getInfos(plantid){

}
