document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('#post-list a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const filename = link.getAttribute('data-post');
      if (filename) {
        loadPost(filename);
      }
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const postFromURL = urlParams.get('post');
  if (postFromURL) {
    loadPost(postFromURL);
  }

  // Función para manejar el clic en el botón de "Crear entrada"
  const createPostButton = document.getElementById('create-post');
  if (createPostButton) {
    createPostButton.addEventListener('click', () => {
      // Acción para el botón de crear entrada
      window.location.href = "crear_entrada.html";  // Redirige a una página de creación de entradas
    });
  }
});

function loadPost(filename) {
  fetch('posts/' + filename)
    .then(res => res.ok ? res.text() : null)
    .then(md => {
      if (md) {
        const html = marked.parse(md);
        document.getElementById('content').innerHTML = html;
      }
    });
}
