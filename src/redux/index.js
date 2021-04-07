// Action Types

const SET_VELO_VIEWER_DATA = 'SET_VELO_VIEWER_DATA'
const SET_MAP_SETTING_SHOW_GRID = 'SET_MAP_SETTING_SHOW_GRID'
const SET_MAP_SETTING_SHOW_ALL_RIDES = 'SET_MAP_SETTING_SHOW_ALL_RIDES'
const SET_MAP_SETTING_SHOW_EXPLORER_TILES = 'SET_MAP_SETTING_SHOW_EXPLORER_TILES'

// Action Creators

export function setVeloViewerData(data) {
    return { type: SET_VELO_VIEWER_DATA, payload: data }
}

export function setMapSettingShowGrid(data) {
    return { type: SET_MAP_SETTING_SHOW_GRID, payload: data }
}

export function setMapSettingShowAllRides(data) {
    return { type: SET_MAP_SETTING_SHOW_ALL_RIDES, payload: data }
}

export function setMapSettingShowExplorerTiles(data) {
    return { type: SET_MAP_SETTING_SHOW_EXPLORER_TILES, payload: data }
}

// reducer

const initialState = {
    veloViewerData: {
        ridesCount: 0,
        allRidesJson: undefined,
        explorerTiles: undefined,
        maxClump: undefined,
        maxSquares: undefined
    },
    mapSettings: {
        showGrid: true,
        showAllRides: true,
        showExplorerTiles: true
    }
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_VELO_VIEWER_DATA:
            return { ...state, veloViewerData: action.payload }

        case SET_MAP_SETTING_SHOW_GRID:
            return { ...state, mapSettings: { ...state.mapSettings, showGrid: action.payload } }

        case SET_MAP_SETTING_SHOW_ALL_RIDES:
            return { ...state, mapSettings: { ...state.mapSettings, showAllRides: action.payload } }

        case SET_MAP_SETTING_SHOW_EXPLORER_TILES:
            return { ...state, mapSettings: { ...state.mapSettings, showExplorerTiles: action.payload } }

        default:
            return state
    }
}

export default rootReducer