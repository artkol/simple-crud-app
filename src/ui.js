class UI {
  constructor() {
    this.postTitle = document.querySelector('#post-title');
    this.postBody = document.querySelector('#post-body');
    this.id = document.querySelector('#id');
    this.postSubmit = document.querySelector('#post-submit');
    this.displayposts = document.querySelector('#display-posts');
    this.formEnd = document.querySelector('.form-end');
    this.cancelField = document.querySelector('#cancel-field');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach(post => {
      output += `<div class="card">
      <header class="card-header">
        <p class="card-header-title">${post.title}</p>
      </header>
      <div class="card-content">
        <div class="content">${post.body}</div>
      </div>
      <footer class="card-footer">
        <a href="#"  id="edit-post" class="card-footer-item has-text-info" data-id="${
          post.id
        }">Edit</a>
        <a href="#" id="delete-post" class="card-footer-item has-text-danger" data-id="${
          post.id
        }">Delete</a>
      </footer>
    </div>`;
    });
    this.displayposts.innerHTML = output;
  }

  showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    this.formEnd.appendChild(div);

    // clear alert
    setTimeout(() => {
      const currentAlert = document.querySelector('.alert');
      if (currentAlert) {
        currentAlert.remove();
      }
    }, 1000);
  }

  fillForm(data) {
    this.postTitle.value = data.title;
    this.postBody.value = data.body;
    this.id.value = data.id;

    this.changeFormState('edit');
  }

  changeFormState(state) {
    if (state === 'edit') {
      this.postSubmit.textContent = 'Update post';
      this.postSubmit.className = 'button is-info is-fullwidth';
      this.cancelField.className = 'field';
    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'button is-primary is-fullwidth';
      this.cancelField.className = 'field is-hidden';
      this.id.value = '';
      this.clearFields();
    }
  }

  clearFields() {
    this.postTitle.value = '';
    this.postBody.value = '';
  }
}

export const ui = new UI();
