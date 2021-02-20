import regeneratorRuntime from "regenerator-runtime";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import "./css/grillade.css";

const title = document.createElement('h1');
title.innerHTML = 'PlantSearcher';

const description = document.createElement('p');
description.innerHTML = "PlantSearcher est un moteur de recherche référencant des milliers de plantes";

let token = 'Fh5DUrCLASPWC00uquG6RhbQ3uluXJw5wSNyjyqU1Xs';

const input_value = document.createElement('input');
input_value.setAttribute('type', 'text');
input_value.setAttribute('id', 'input_id');
input_value.addEventListener("keypress", function (e) {
  if (e.key === 'Enter') {
    search();
  }
})

const button = document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('id', 'buttid');
button.addEventListener("click", search);
button.value = 'Chercher';

const content = document.createElement('div');
content.setAttribute('class', 'container');
document.body.appendChild(content);

const plant = document.createElement('h2');
plant.setAttribute('id', 'result');

const modal = document.createElement('p');
modal.setAttribute('id', 'modal');

content.appendChild(title);
content.appendChild(description);
content.appendChild(input_value);
content.appendChild(button);

content.appendChild(plant);
content.appendChild(modal);


function search() {
  const plant = document.createElement('p');
  plant.setAttribute('id', 'result');

  let butt = document.getElementById('input_id').value;

  let requestURL = 'https://trefle.io/api/v1/plants/search?token=' + token + '&q=' + butt + '&limit=6';

  const fetch = require('node-fetch');

  (async () => {
    const response = await fetch(requestURL);
    const myjson = await response.json();

    let text = '<div class="row">';
    for (let i = 0; i < myjson.data.length; i++) {
      let nophoto = "http://placehold.jp/a4aeb8/000000/250x300.png?text=Pas%20d'image%20pour%20cette%20plante"

      text += "<div class='col-md-4 boxplante'><p><span id='title'>" + (myjson.data[i].common_name == null ? myjson.data[i].scientific_name : myjson.data[i].common_name) + "</span></p>"
       + (myjson.data[i].image_url == null ? '<img src=' + nophoto + '>' : '<img height=300 width=250px src=' + myjson.data[i].image_url + '>') + "<br>";

      text += "<input type='button' data-toggle=\"modal\" data-target=\"#largeModal\" class='btn btn-info' id='plant" + i + "' value='En savoir plus'><br></div>";
    }
    text += '</div>';

    text += '<div class="modal fade" id="largeModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">\n' +
    '  <div class="modal-dialog modal-lg">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h4 class="modal-title" id="myModalLabel"></h4>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body" id="modal-body">\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>\n';

    plant.innerHTML = text;

    content.removeChild(document.getElementById('result'));
    content.appendChild(plant);

   for (let i = 0; i < myjson.data.length; i++) {        
        document.getElementById('plant' + i).addEventListener('click', function () {
        let requestURL2 = 'https://trefle.io' + myjson.data[i].links.plant + '?token=' + token;
        (async () => {
          const response = await fetch(requestURL2);
          const myjson = await response.json();

          document.getElementById('myModalLabel').innerHTML = myjson.data.common_name;
          let body = (myjson.data.image_url == null ? 'No photo' : '<img height=300 src=' + myjson.data.image_url + '>')+'<br>';
          body += "<p>Nom scientifique : "+myjson.data.scientific_name+"</p>";

          document.getElementById('modal-body').innerHTML = body;
        })();
      });
    }
  })();
}

function getInfos(plantid) {

}