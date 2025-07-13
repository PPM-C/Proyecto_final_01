 /*HAMBURGUER */
 const hamburger = document.querySelector('.hamburger');
  const menuLinks = document.querySelector('.menu-links');

  hamburger.addEventListener('click', () => {
    menuLinks.classList.toggle('show');
  });

/* PROJECT */
window.addEventListener("DOMContentLoaded", async () => {
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

    // Proyecto principal
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

    // Otros proyectos (excluyendo el actual)
    const otrosProyectos = projects.filter(p => p.uuid !== id).slice(0, 3);

    const html = otrosProyectos.map(p => `
      <article>
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <br>
        <p><a class="btn-general" href="../pages/projects.html?id=${p.uuid}">Learn more</a></p>
      </article>
    `).join("");

    document.getElementById("3projects").innerHTML = html;

  } catch (err) {
    console.error(err);
    document.getElementById("project").innerHTML = "<p>Error al cargar el proyecto.</p>";
    document.getElementById("3projects").innerHTML = "<p>Error al cargar proyectos relacionados.</p>";
  }
});

/* FORMULARIO */
function validateFormRealTime() {
  const form = document.querySelector("form");
  if (!form) return;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  const phonePattern = /^\+?\d{7,15}$/;

  function showError(input, message) {
    removeError(input);
    const error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "0.8rem";
    error.textContent = message;
    input.insertAdjacentElement("afterend", error);
  }

  function removeError(input) {
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.remove();
  }

  function validateInput(input) {
    const value = input.value.trim();
    if (input === name) {
      if (value === "" || /^\d+$/.test(value)) {
        showError(input, "Full Name is required and cannot be only numbers.");
        return false;
      }
    } else if (input === email) {
      if (!emailPattern.test(value)) {
        showError(input, "Please enter a valid email address.");
        return false;
      }
    } else if (input === phone) {
      if (!phonePattern.test(value)) {
        showError(input, "Please enter a valid phone number.");
        return false;
      }
    } else if (input === message) {
      if (value.length < 10) {
        showError(input, "Message must be at least 10 characters.");
        return false;
      }
    }
    removeError(input);
    return true;
  }

  [name, email, phone, message].forEach(input => {
    input.addEventListener("input", () => validateInput(input));
    input.addEventListener("blur", () => validateInput(input));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    [name, email, phone, message].forEach(input => {
      if (!validateInput(input)) valid = false;
    });

    if (valid) {
      alert("Form submitted successfully!");
      form.reset();
      document.querySelectorAll(".error-message").forEach(el => el.remove());
    }
  });
}

document.addEventListener("DOMContentLoaded", validateFormRealTime);
