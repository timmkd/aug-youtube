/* global gapi */
export const searchVideos = (keywords) => (dispatch) => {
  console.log(keywords);
  console.log('using gapi to search');

  if (keywords.length >= 3) {
    dispatch({
      type: 'SET_TO_LOADING'
    });
    gapi.client.youtube.search.list({
      'part': [
        'snippet'
      ],
      'type':'video',
      'maxResults': 25,
      'q': keywords
    })
    .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log('Response', response); 
      dispatch({
        type: 'RECEIVE_VIDEOS',
        videos: response.result.items
      });
      dispatch({
        type: 'SET_NOT_LOADING'
      });
    },
    function (err) { console.error('Execute error', err); });
  } else {
    dispatch({
      type: 'CLEAR_VIDEOS'
    });
  }

  
  
  // const api = `/products/${handle}.js`;

  // return axios.get(api)
  //   .then((res) => {
  //     dispatch({
  //       type: 'RECEIVE_RECENT_ITEM',
  //       item: {
  //         ...res.data,
  //         measurements,
  //       },
  //     });
  //   })
  //   .catch((error) => {
  //     // eslint-disable-next-line no-console
  //     console.log(error);
  //     if (error.response && error.response.data) {
  //       dispatch({
  //         type: 'RECEIVE_RECENT_ITEMS_ERROR',
  //         error: error.response.data.description,
  //       });
  //     }
  //   });
};

export const getVideosById = (ids) => (dispatch) => {
  console.log(ids);
  console.log('using gapi to get a list of items');

  if (ids.length) {
    dispatch({
      type: 'SET_TO_LOADING'
    });
    gapi.client.youtube.videos.list({
      "part": [
        "snippet"
      ],
      "id": [...ids]
    })
      .then(function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', response);
        dispatch({
          type: 'RECEIVE_VIDEOS',
          videos: response.result.items
        });
        dispatch({
          type: 'SET_NOT_LOADING'
        });
      },
        function (err) { console.error('Execute error', err); });
  } else {
    dispatch({
      type: 'CLEAR_VIDEOS'
    });
  }
};

export const addVideoToStorage = (id, storageLocation = 'history') => (dispatch) => {
  const storageString = window.localStorage.getItem(storageLocation) || '';
  let storageAsArray = storageString.split(',');
  let newStorage = null;
  
  if (storageAsArray.indexOf(id) > -1) {
    newStorage = [id, storageAsArray.filter(item=>item !== id)];
  } else {
    newStorage = [id, ...storageAsArray];
  }
  window.localStorage.setItem(storageLocation, newStorage);
  dispatch({
    type: 'SET_VIDEO_IDS',
    videoType: storageLocation,
    ids: newStorage
  });
  console.log(window.localStorage.getItem(storageLocation));
}

export const removeVideoFromStorage = (id, storageLocation = 'history') => (dispatch) => {
  const storageString = window.localStorage.getItem(storageLocation) || '';
  let storageAsArray = storageString.split(',');
  const  newStorage = storageAsArray.filter(item=>item !== id);
  
  window.localStorage.setItem(storageLocation, newStorage);
  dispatch({
    type: 'SET_VIDEO_IDS',
    videoType: storageLocation,
    ids: newStorage
  });
  console.log(window.localStorage.getItem(storageLocation));
}

export const setPlayerId = (id) => ({
  type: 'SET_PLAYER_ID',
  id
});

export const setActiveSection = (section) => ({
  type: 'SET_ACTIVE_SECTION',
  section
});

export const setKeyword = (keyword) => ({
  type: 'SET_KEYWORD',
  keyword
});


export const clearVideos = () => ({
  type: 'CLEAR_VIDEOS'
});
