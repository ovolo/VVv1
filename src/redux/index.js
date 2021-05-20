// Action Types

const SET_VELO_VIEWER_DATA = 'SET_VELO_VIEWER_DATA'
const SET_MAP_SETTING_SHOW_GRID = 'SET_MAP_SETTING_SHOW_GRID'
const SET_MAP_SETTING_SHOW_ALL_RIDES = 'SET_MAP_SETTING_SHOW_ALL_RIDES'
const SET_MAP_SETTING_SHOW_EXPLORER_TILES = 'SET_MAP_SETTING_SHOW_EXPLORER_TILES'
const SET_MAP_SETTING_MAP_STYLE = 'SET_MAP_SETTING_MAP_STYLE'

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

export function setMapSettingMapStyle(data) {
    return { type: SET_MAP_SETTING_MAP_STYLE, payload: data }
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
        showExplorerTiles: true,
        mapStyle: {name: 'Streets', styleUrl: 'mapbox://styles/mapbox/streets-v11'}
    },
    mapStyles: [
        {name: 'Streets', styleUrl: 'mapbox://styles/mapbox/streets-v11'},
        {name: 'Outdoors', styleUrl: 'mapbox://styles/mapbox/outdoors-v11'},
        {name: 'Light', styleUrl: 'mapbox://styles/mapbox/light-v10'},
        {name: 'Dark', styleUrl: 'mapbox://styles/mapbox/dark-v10'},
        {name: 'Satellite', styleUrl: 'mapbox://styles/mapbox/satellite-v9'},
        {name: 'Satellite Streets', styleUrl: 'mapbox://styles/mapbox/satellite-streets-v11'},
        {name: 'Navigation Day', styleUrl: 'mapbox://styles/mapbox/navigation-day-v1'},
        {name: 'Navigation Night', styleUrl: 'mapbox://styles/mapbox/navigation-night-v1'}
    ]
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

        case SET_MAP_SETTING_MAP_STYLE:
            return { ...state, mapSettings: { ...state.mapSettings, mapStyle: action.payload } }
    
        default:
            return state
    }
}

export default rootReducer