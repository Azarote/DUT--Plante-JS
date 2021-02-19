import regeneratorRuntime from "regenerator-runtime";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./css/grillade.css";

  const title = document.createElement('h1');
  title.innerHTML = 'PlantSearcher';
  
  const description = document.createElement('p');
  description.innerHTML = "PlantSearcher est un moteur de recherche référencant des milliers de plantes";
 
  let token = 'Fh5DUrCLASPWC00uquG6RhbQ3uluXJw5wSNyjyqU1Xs';

  const input_value = document.createElement('input');
  input_value.setAttribute('type', 'text');
  input_value.setAttribute('id', 'input_id');
  input_value.addEventListener("keypress", function (e){
      if (e.key === 'Enter'){
          search();
      }
  })

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

    let requestURL = 'https://trefle.io/api/v1/plants/search?token='+token+'&q='+butt+'&limit=6';
  
    const fetch = require('node-fetch');
  
    (async () => {
      const response = await fetch(requestURL);
      const myjson = await response.json();
      
      let text = '<div class="grid grid-cols-3">';
      for(let i=0; i<myjson.data.length; i++){
          let nophoto = "http://placehold.jp/808080/ffffff/400x300.png?text=Pas%20d'image%20pour%20cette%20plante%20%3A%2F"

          text += "<div><a href=''> "+(myjson.data[i].common_name == null ? myjson.data[i].scientific_name : myjson.data[i].common_name)+"</a>"+
          "<br>"+(myjson.data[i].image_url == null ? '<img src='+nophoto+'>' : '<img height=300 src='+myjson.data[i].image_url+'>')+"<br>";
  
        text += "<input type='button' data-toggle=\"modal\" data-target=\"#largeModal\" class='btn btn-info' id='plant"+i+"' value='En savoir plus'><br></div>";
      }
      text += '</div>';

      text += '<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">\n' +
          '  <div class="modal-dialog modal-lg">\n' +
          '    <div class="modal-content">\n' +
          '      <div class="modal-header">\n' +
          '        <h4 class="modal-title" id="myModalLabel">titre</h4>\n' +
          '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
          '          <span aria-hidden="true">&times;</span>\n' +
          '        </button>\n' +
          '      </div>\n' +
          '      <div class="modal-body">\n' +
          '        <h3>Modal Body</h3>\n' +
          '      </div>\n' +
          '    </div>\n' +
          '  </div>\n' +
          '</div>\n';
      plant.innerHTML = text; 
  
      document.body.removeChild(document.getElementById('result'));
      document.body.appendChild(plant);
    })();
 }

function getInfos(plantid){

}
