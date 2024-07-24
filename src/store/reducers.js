import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { loginreducer } from './myloginreducer';
import { dashreducer } from './DashReducer';
import { intersetreducer } from './intertsreducer';
import { subintersetreducer } from './subinterst';
import { addintersetreducer } from './addinterst';
import { addsubintersetreducer } from './addsubintersetreducer';
import { editintersetreducer } from './editinteset';
import { editsubintersetreducer } from './editsubreducer';
import { blockreducer } from './block';
import { blocksubreducer } from './blocksub';
import { userred } from './userReducer';
import { deleteuserreducer } from './deleteuser';
import { blockuserreducer } from './blockuser';
import { userdata } from './userData';
import { usergrplistdata } from './usergrpred';
import adminConnectionListReducer from './admingrplist';
import clueReducer from './cluereducer';
import clueaddReducer from './clueaddred';
import cluedelteReducer from './deleteclured';
import clueeditReducer from './editclue';
import { gamelistreducer } from './gamelist';
import { gamedeletelistreducer } from './gamedeletelist';
import { booklistreducer } from './chatReducer';
import { chatlisteditreducer } from './chateditred';
import { chataddreducer } from './chataddred';
import { deletchatreducer } from './deletechatred';
import { trcreducer } from './trasctionred';

const reducers = combineReducers({
  form: formReducer,
  login: loginreducer,
  dash: dashreducer,
  interestred: intersetreducer,
  subinterset: subintersetreducer,
  addinterest: addintersetreducer,
  addsubinterest: addsubintersetreducer,
  editinterest: editintersetreducer,
  editsubintersetreducer: editsubintersetreducer,
  blockreducer: blockreducer,
  blocksubreducer: blocksubreducer,
  userreducer: userred,
  userdeletered: deleteuserreducer,
  userblock: blockuserreducer,
  userdatared: userdata,
  usergrplistdata: usergrplistdata,
  adminConnectionListReducer: adminConnectionListReducer,
  cluereducer: clueReducer,
  clueaddred: clueaddReducer,
  cluedeletered: cluedelteReducer,
  clueeditred: clueeditReducer,
  gamelistred: gamelistreducer,
  gamedeletelistred: gamedeletelistreducer,
 bookdata: booklistreducer,
  chateditred: chatlisteditreducer,
  chataddred: chataddreducer,
  deletchatred: deletchatreducer,
  tractionred: trcreducer
});

export default reducers;
