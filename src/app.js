import { http } from './http';
import { ui } from './ui';

const getPosts = () => {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
};

const submitPost = () => {
  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  };

  if (title !== '' && body !== '') {
    // create post
    if (id === '') {
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert has-text-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert has-text-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  } else {
    ui.showAlert('Please input data', 'alert has-text-danger');
  }
};

const deletePost = e => {
  e.preventDefault();
  if (e.target.id === 'delete-post') {
    const id = e.target.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post deleted', 'alert has-text-success');
        getPosts();
      })
      .catch(err => console.log(err));
  }
};

const enableEdit = e => {
  e.preventDefault();
  if (e.target.id === 'edit-post') {
    const id = e.target.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent.trim();
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim();
    const data = { id, title, body };
    console.log(data.id, data.title, data.body);
    ui.fillForm(data);
  }
};

const cancelEdit = e => {
  e.preventDefault();
  ui.changeFormState('add');
};

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// listen for add posts
document.querySelector('#post-submit').addEventListener('click', submitPost);

// listen for delete posts
document.querySelector('#display-posts').addEventListener('click', deletePost);

// listen for edit state
document.querySelector('#display-posts').addEventListener('click', enableEdit);

// listen for cancel
document.querySelector('#cancel-btn').addEventListener('click', cancelEdit);
