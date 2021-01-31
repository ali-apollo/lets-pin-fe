import { combineReducers } from 'redux'
import { reducer as loginReducer } from '../pages/login/store'
import { reducer as jigsawReducer } from '../pages/jigsaw/store'
import { reducer as roomReducer } from '../pages/room/store'
import { reducer as sortReducer } from '../pages/sort/store'
import { reducer as signupReducer } from '../pages/signup/store'

const reducer = combineReducers({
  login: loginReducer,
  jigsaw: jigsawReducer,
  room: roomReducer,
  sort: sortReducer,
  signup: signupReducer,
});

export default reducer
