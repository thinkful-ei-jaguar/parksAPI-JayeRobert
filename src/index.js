import $ from 'jquery';
import './index.css';


function displayResults(responseJson,max) {
  
  console.log(responseJson);
  console.log(max);
  console.log(responseJson.data[1].fullName);
  console.log(responseJson.data[1].description);
  console.log(responseJson.data[1].url);
  
  
  $('#results-list').empty();
  for (let i = 0; i < max; i++){
  
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[1].description}</p>
      <a href=${responseJson.data[1].url}>Website</a>
      </li>`
    )};
  //display the results section  <img src='${responseJson.data[i].snippet.thumbnails.default.url}'>
  $('#results').removeClass('hidden');
};

function getParks(query, maxResults=10) {
  //const queryString = formatQueryParams(params)

    //const url = searchURL + '?'+'parks?parkCode=acad'+ apiKey;
    const url2 =`https://developer.nps.gov/api/v1/parks?stateCode=${query}&api_key=D1oQPOGMDAKZOUK9xWfffurbK3iSzL2aGFhz3yDS`
    //console.log(url);
    console.log(url2);
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
    //console.log(searchTerm);
    getParks(searchTerm, maxResults);
  });
}

$(watchForm);



