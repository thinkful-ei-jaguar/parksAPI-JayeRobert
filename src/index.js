import $ from 'jquery';
import './index.css';


function displayResults(responseJson,max) {
  $('#results-list').empty();
  for (let i = 0; i < max; i++){
  
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[1].description}</p>
      <a href=${responseJson.data[1].url}>Website</a>
      </li>`
    )};
  //<img src='${responseJson.data[i].snippet.thumbnails.default.url}'>
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  
    const url2 =`https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=D1oQPOGMDAKZOUK9xWfffurbK3iSzL2aGFhz3yDS`
    
  fetch(url2)
    .then(response => {
      if (response.ok) {
        return response.json();
        
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson,maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);



