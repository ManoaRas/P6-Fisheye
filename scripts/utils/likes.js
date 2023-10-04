export class LikesUtils {
  constructor(data) {
    this.insertLikes = document.querySelector(".likes");
    this._likes = 0;
    this._price = data.price
  }

  insertHTML(likes) {
    return `<span>${likes} <i class="fa fa-heart"></i></span> <span>${this._price}€ / jour</span>`;
  }

  _likeHandler(e) {
    const currentLike = e.target.closest("[data-user-like]");
    const captionLikeText = currentLike.querySelector(".caption .like-text");
    const captionLikeIcon = currentLike.querySelector(".caption .like-icon");
    let likesText = parseInt(captionLikeText.innerText);

    if (currentLike.dataset.userLike === "false") {
      currentLike.dataset.userLike = true;
      currentLike.dataset.likes = likesText + 1;
      captionLikeText.innerHTML = `${likesText + 1}`;
      captionLikeIcon.innerHTML = "<i class='fa fa-heart'></i>";
      this._likes++;
    } else {
      currentLike.dataset.userLike = false;
      currentLike.dataset.likes = likesText - 1;
      captionLikeText.innerHTML = `${likesText - 1}`;
      captionLikeIcon.innerHTML = "<i class='far fa-heart'></i>";
      this._likes--;
    }
    this.insertLikes.innerHTML = this.insertHTML(this._likes);
  }

  init() {
    const likeText = [ ...document.querySelectorAll(".like-text") ];
    const likeButton = [ ...document.querySelectorAll(".like-icon") ];
    const likeHandlerBind = this._likeHandler.bind(this);
    likeText.map(like => this._likes += parseInt(like.innerText));
    likeButton.map(like => {
      like.addEventListener("click", likeHandlerBind);
      like.addEventListener("keydown", e => (e.key === "Enter") && likeHandlerBind(e));
    });
    this.insertLikes.addEventListener("click", () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.querySelector(".btn-contact").focus();
    });
    this.insertLikes.innerHTML = this.insertHTML(this._likes);
  }
}
