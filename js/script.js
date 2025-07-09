 /*Menu hamburguesa */
 const hamburger = document.querySelector('.hamburger');
  const menuLinks = document.querySelector('.menu-links');

  hamburger.addEventListener('click', () => {
    menuLinks.classList.toggle('show');
  });

  /* Project */
  async function loadProject() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      document.getElementById("project").innerHTML = "<p>ID de proyecto no válido.</p>";
      return;
    }

    try {
      const res = await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects');
      let projects = await res.json();

      projects.reverse();

      const data = projects.find(p => p.uuid === id);

      if (!data) {
        document.getElementById("project").innerHTML = "<p>Proyecto no encontrado.</p>";
        return;
      }

      const project = document.getElementById("project");

      project.innerHTML = `
        <h1 class="project-title">${data.name}</h1>
        <div class="project-info">
        <p class="project-description">${data.description}</p>
        <p class="project-date">Completed on ${data.completed_on || 'Fecha no disponible'}</p>
        </div>
        <div class="project-img">
          <img src="${data.image}" alt="${data.name}"/>
        </div>
        <div class="project-txt">${data.content}</div>
      `;
    } catch (err) {
      console.error(err);
      document.getElementById("project").innerHTML = "<p>Error al cargar el proyecto.</p>";
    }
  }

  window.addEventListener("DOMContentLoaded", loadProject);