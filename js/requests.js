import { buttonElement, nameInputElement, commentInputElement } from "./elements.js";
import { renderApp } from './renders.js';
import { formatDateTime } from "./formatDate.js"
export { getComments, postComment, comments }

let comments = [];

const getComments = () => {

    const request = fetch("https://wedev-api.sky.pro/api/v1/andrey-kr/comments", {
        method: "GET"
    });
    request.then((response) => {
        return response.json();
    })
        .then((response) => {
            comments = response.comments.map((comment) => {
                return {
                    author: comment.author.name,
                    date: formatDateTime(comment.date),
                    text: comment.text,
                    likesCount: comment.likes,
                    likedByUser: comment.isLiked,
                }
            });
        })
        .then(() => {
            renderApp();
            loader.innerHTML = '';
            buttonElement.disabled = false;
        })
        // .catch((error) => {
        //     buttonElement.disabled = false;
        //     alert('Ошибка на сервере, пожалуйста попробуйте позже');
        // })
        ;
};

const postComment = () => {
    fetch("https://wedev-api.sky.pro/api/v1/andrey-kr/comments", {
        method: "POST",
        body: JSON.stringify({
            text: commentInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('500');
            } else if (response.status === 400) {
                throw new Error('400');
            }
        })
        .then(() => {
            getComments();
            commentInputElement.value = '';
        })
        .catch((error) => {

            if (error.message === '500') {
                buttonElement.disabled = false;
                alert('Сервер сломался, попробуйте позже');
            } else if (error.message === '400') {
                nameInputElement.classList.add("error");
                commentInputElement.classList.add("error");
                buttonElement.disabled = false;
                alert('Имя и комментарий должны быть не короче 3 символов');
            } else {
                buttonElement.disabled = false;
                alert('Что-то пошло не так, попробуйте позже');
            }
        });

};