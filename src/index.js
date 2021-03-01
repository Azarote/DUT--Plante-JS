import regeneratorRuntime from "regenerator-runtime";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import background from "./img/gplay.png";


document.body.style.backgroundImage = "url(" + background + ")";

const title = document.createElement('h1');
title.innerHTML = 'PlantSearcher 🌱';

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

    let text = '<div class="container">';
    for (let i = 0; i < myjson.data.length; i++) {
      let nophoto = "http://placehold.jp/a4aeb8/000000/250x300.png?text=Pas%20d'image%20pour%20cette%20plante"

      text += "<div class='boxplante'><p><span class='title'>" + (myjson.data[i].common_name == null ? myjson.data[i].scientific_name : myjson.data[i].common_name) + "</span></p>"
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
          let body = (myjson.data.image_url == null ? 'No photo' : '<img id="imagemodal" height=300 src=' + myjson.data.image_url + '>')+'<br>';
          let nodata = "<span id=no_data>Pas de données disponibles.</span>";
          body += "<div id='info'><h3>Info générale</h3> <hr>";
          body += "<p><span class='title'>Nom commun </span>: " +(myjson.data.common_name == null ? nodata : myjson.data.common_name) + "</p>";
          body += "<p><span class='title'>Nom scientifique </span>: "+(myjson.data.scientific_name == null ? nodata :myjson.data.scientific_name) +"</p>";
          body += "<p><span class='title'>Genre </span>: "+(myjson.data.main_species.genus == null ? nodata : myjson.data.main_species.genus)+"</p>";
          body += "<p><span class='title'>Famille </span>: "+(myjson.data.main_species.family == null ? nodata : myjson.data.main_species.family)+"</p>";
          body += "<p><span class='title'>Nom commun famille </span>: "+(myjson.data.family_common_name == null ? nodata : myjson.data.family_common_name) +"</p></div>";
          body += '<div id="accordion">'
          +'<div class="card">'
          + '<div class="card-header" id="headingOne">'
          +    '<button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'
          +      'Autres images'
          +    '</button>'
          +'</div>'
          +'<div id="collapseOne" class="collapse" aria-labelledby="headingOne">'
          +'<div class="card-body">'
          +'<div id="accordionimage">';


          for (let i = 0; i < Object.keys(myjson.data.main_species.images).length; i++) {
            let val = Object.keys(myjson.data.main_species.images)[i];

            for(let i = 0; i < Object.keys(myjson.data.main_species.images[val]).length; i++){
              body+= '<img height=300 src='+myjson.data.main_species.images[val][i].image_url+'>';    
            }
          }

          body += '</div></div></div></div></div>';

          document.getElementById('modal-body').innerHTML = body;
        })();
      });
    }
  })();
}
