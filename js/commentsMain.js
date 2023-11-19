import { getComments } from './requests.js';
import { renderComments } from './renders.js';
import { initCommentsListeners, initLikeButtonsListeners, initAddButtonListener } from './listeners.js';

export const commentsModule = () => {

getComments();
renderComments();
initCommentsListeners();
initLikeButtonsListeners();
initAddButtonListener();

};