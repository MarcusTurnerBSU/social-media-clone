function showPosts(posts) {
  let template = document.getElementById("post-template");
  let container = document.getElementById("posts-container");

  posts.forEach((post) => {
    let clone = template.content.firstElementChild.cloneNode(true);
    clone.getElementsByTagName("h2")[0].textContent = post.title;
    clone.getElementsByClassName("body")[0].textContent = post.body;
    if (post.image_id) {
      clone.getElementsByTagName("img")[0].src = "/uploads/" + post.filepath;
    }

    container.appendChild(clone);
  });
}
