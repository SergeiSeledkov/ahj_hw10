export default class AddPost {
  constructor(text, coords) {
    this.text = text;
    this.coords = coords;
    this.postWrapper = document.querySelector('.post-wrapper');
  }

  createPost() {
    const postDiv = document.createElement('div');
    const postTextDiv = document.createElement('div');
    const postCoordinatesDiv = document.createElement('div');

    postDiv.classList.add('post');
    postTextDiv.classList.add('post-text');
    postCoordinatesDiv.classList.add('post-coordinates');
    postTextDiv.textContent = this.text;
    postCoordinatesDiv.textContent = this.coords;
    postDiv.prepend(postTextDiv);
    postDiv.append(postCoordinatesDiv);
    this.postWrapper.prepend(postDiv);
  }
}
