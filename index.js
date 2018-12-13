'use strict'
/*eslint-env jquery*/
const YT_SRCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const apikey = process.env.API_KEY
let searchTerm ='';

function getDataFromApi(query, callback) {
     let test= $.getJSON(YT_SRCH_URL, query, callback);
    console.log(test);
}

//the videoMetaData here is the object being created
function translateIntoHtml(videoMetaData) {
    return `
<div class='video-box'>
    <p>
        <label for="Youtube URL Link"> <b>You<span style="background-color: #FF0000">Tube</span></b> Link: 
          <a href="https://www.youtube.com/watch?v=${videoMetaData.id}"><u>${videoMetaData.title}</u></a>
        </label>
    </p>
    <img class='thumb' src="${videoMetaData.thumbnail}"></img>
    <a href="<a href="https://www.youtube.com/channel/${videoMetaData.channel}"><b>Click here</b> for more videos from this Channel: ${videoMetaData.channelName}</a>
</div>
    `
}

function returnObj(item){
    return {
        id : item.id.videoId, 
        title: item.snippet.title, 
        thumbnail : item.snippet.thumbnails.medium.url,
        channel : item.snippet.channelId, 
        channelName : item.snippet.channelTitle
    };
}

function createObjAndHtml(returnedJson){
    const filteredRawApi = returnedJson.items.map(returnObj);
    const htmlDecoration = filteredRawApi.map(translateIntoHtml);
        // const results = returnedJson.items.map((item) => translateIntoHtml({
    //     id : item.id.videoId, 
    //     title: item.snippet.title, 
    //     thumbnail : item.snippet.thumbnails.medium.url,
    //     channel : item.snippet.channelId, 
    //     channelName : item.snippet.channelTitle
    //   }));
    
      //next = data.nextPageToken; 
      //prev = data.prevPageToken; 
      
      $('.tubecontainer').html(htmlDecoration);
    
}

function watchSubmit() { 
    $('#formInput').submit(function(event){ 
      event.preventDefault(); 
      const val = $('#search').val(); 
      searchTerm = val; 
      $('#search').val(''); 
      const query = { q: `${searchTerm}`, key : apikey, part :'snippet'}; 
      getDataFromApi(query, createObjAndHtml); 
  
    });
  }


  function handleFunctions(){ 
    watchSubmit(); 
  }
  
  $(handleFunctions); 
  