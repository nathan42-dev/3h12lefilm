// Fonction pour ouvrir la modale avec vidéo locale ou iframe
function openModal(title, description, videoSrc) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalContent = document.getElementById("modal-content");
    document.body.style.overflow = "hidden";
    // Met à jour les informations de la modale
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Si la source de la vidéo est une URL YouTube/Vimeo (iframe)
    if (videoSrc.includes("youtube.com") || videoSrc.includes("vimeo.com")) {
        modalContent.innerHTML = `
            <iframe width="100%" height="400" 
                    src="${videoSrc}?rel=0&modestbranding=1&autoplay=1" 
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
            </iframe>
        `;
    } else {
        // Si c'est une vidéo locale
        modalContent.innerHTML = `
            <video id="modal-video" width="100%" height="400" controls>
                <source src="${videoSrc}" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
            </video>
        `;
    }

    modal.style.display = "flex";
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalVideo = document.getElementById("modal-video");
    document.body.style.overflow = "";
    modal.style.display = "none";

    // Si une vidéo est en cours de lecture, on la met en pause
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0; // Réinitialise la vidéo
    }

    // Vide le contenu de la modale (enlève l'iframe ou vidéo)
    modalContent.innerHTML = "";
}

// Ajouter un événement au chargement de la page pour gérer les vidéos et modales
document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".video-item");
    videos.forEach((video) => {
        video.addEventListener("click", (event) => {
            const title = video.getAttribute("data-title");
            const description = video.getAttribute("data-description");
            const videoSrc = video.getAttribute("data-src");
            openModal(title, description, videoSrc);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // Fermer le menu après clic sur un lien
    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
});

