import { comments } from './requests.js';
import { commentListElement } from './elements.js';
import { initLikeButtonsListeners, initCommentsListeners } from './listeners.js';
export { renderComments, renderApp };


const renderComments = () => {
    const commentsHtml = comments
      .map((comment, index) => {
        return `<li class="comment" id="comment" data-index="${index}">
            <div class="comment-header">
              <div>${comment.author}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likesCount}</span>
                <button data-index="${index}" id="like-button" class="like-button ${comment.likedByUser ? '-active-like' : ''}"></button>
              </div>
            </div>
          </li>`;
      })
      .join("");

    commentListElement.innerHTML = commentsHtml;

  };

  const renderApp = () => {
    renderComments();
    initLikeButtonsListeners();
    initCommentsListeners();
  };