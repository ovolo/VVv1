// Action Types

export const APPLY_VELO_VIEWER_DATA = 'APPLY_VELO_VIEWER_DATA'

// Action Creators

export function applyveloviewerdata(id) {
  return {
    type: APPLY_VELO_VIEWER_DATA,
    payload: id
  }
}

// reducer

const initialState = {
    veloViewerData: {},
    mapSettings: {
        showGrid: true,
        showAllRides: true,
        showExplorerTiles: true
    }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_VELO_VIEWER_DATA:
      return {
        ...state,
        veloViewerData: action.payload
      }

    default:
      return state
  }
}

export default reducer