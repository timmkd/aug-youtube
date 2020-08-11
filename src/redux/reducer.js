const initialState = {
  isLoading: false,
  videos: [],
  playerId: null,
  videoIds: {
    favourites: window.localStorage.getItem('favourites') ? window.localStorage.getItem('favourites').split(',') : [],
    history: window.localStorage.getItem('history') ? window.localStorage.getItem('history').split(',') : []
  },
  searchKeyword: '',
  activeSection: 'search'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TO_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_NOT_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'RECEIVE_VIDEOS':
      return {
        ...state,
        videos: [...action.videos],
      };
    case 'CLEAR_VIDEOS':
      return {
        ...state,
        videos: [],
      };
    case 'SET_PLAYER_ID':
      return {
        ...state,
        playerId: action.id,
      }
    case 'SET_VIDEO_IDS':
      return {
        ...state,
        videoIds: {
          ...state.videoIds,
          [action.videoType]: action.ids
        },
      }
    case 'SET_KEYWORD':
      return {
        ...state,
        searchKeyword: action.keyword,
      }
    case 'SET_ACTIVE_SECTION':
      return {
        ...state,
        activeSection: action.section,
        }
    default:
      return state;
  }
};
