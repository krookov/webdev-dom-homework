import { postComment, comments } from "./requests.js";
import { renderApp } from "./renders.js";
import { formatDateTime } from "./formatDate.js";
import { buttonElement, nameInputElement, commentInputElement } from "./elements.js";
export { initLikeButtonsListeners, initCommentsListeners, initAddButtonListener };

const initLikeButtonsListeners = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener("click", () => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            comments[index].likedByUser = !comments[index].likedByUser;
            comments[index].likedByUser ? comments[index].likesCount++ : comments[index].likesCount--;
            renderApp();
        });
    }

};

const initCommentsListeners = () => {
    const commentsElements = document.querySelectorAll(".comment");

    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            commentInputElement.value = `> ${comments[index].text}
${comments[index].author},`

            initLikeButtonsListeners();
            initCommentsListeners();
        });
    }
};

const initAddButtonListener = () => {

    buttonElement.addEventListener("click", () => {
        buttonElement.disabled = true;
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");

        if (nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            return;
        }
        if (commentInputElement.value === "") {
            commentInputElement.classList.add("error");
            return;
        }

        const currentDateTime = formatDateTime(new Date);

        postComment();
    
});

};