console.warn("script")
function playVideo() {
    const video = document.getElementById("video");

        function togglePlay() {
            if (video.paused) {
                video.play(); // Lance la vidéo
                video.setAttribute("controls", "controls"); // Ajoute les commandes
            } else {
                video.pause(); // Met la vidéo en pause
                video.removeAttribute("controls"); // Supprime les commandes
            }
        }
}


document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");
    const prechargement = document.getElementById("prechargement");
    const mainContent = document.getElementById("main-content");

    // Vérifie si toutes les vidéos sont prêtes
    let videosLoaded = 0;
    videos.forEach((video) => {
        video.addEventListener("loadeddata", () => {
            videosLoaded++;
            if (videosLoaded === videos.length) {
                // Toutes les vidéos sont prêtes
                prechargement.style.display = "none"; // Cache le préchargement
                mainContent.style.display = "block"; // Affiche le contenu principal
            }
        });
    });
});


// Fonction pour ouvrir la modale

function openModal(title, description, videoSrc) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalVideo = document.getElementById("modal-video");
    const modalSource = document.getElementById("modal-source");

    // Met à jour les informations de la modale
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Change dynamiquement la source de la vidéo
    modalSource.src = videoSrc;
    modalVideo.load(); // Recharge la vidéo avec la nouvelle source
    modal.style.display = "flex";
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById("modal");
    const modalVideo = document.getElementById("modal-video");

    modal.style.display = "none";
    modalVideo.pause(); // Met la vidéo en pause
    modalVideo.currentTime = 0; // Réinitialise la vidéo
}

document.querySelectorAll(".video-item").forEach((video) => {
    video.addEventListener("click",(event) => {
        const title = video.getAttribute("data-title");
        const description = video.getAttribute("data-description");
        const videoSrc = video.getAttribute("data-src");
        openModal(title, description, videoSrc);
        handleVideoClick(event.currentTarget);
    });
    
    video.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Empêche les comportements par défaut
        handleVideoClick(event.currentTarget);
    });
});

// Sélection des éléments
const headerTitle = document.querySelector(".nom");
const backgroundVideo = document.querySelector(".background video");

// Fonction pour détecter si une couleur est sombre
function isDarkColor(r, g, b) {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Calcul de la luminance
    return brightness < 128; // Si la luminance est faible, c'est sombre
}

// Fonction pour analyser la vidéo et ajuster la couleur du texte
function updateTextColor() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Définir la taille du canvas pour capturer un pixel
    canvas.width = 1;
    canvas.height = 1;

    // Dessiner un instantané de la vidéo dans le canvas
    context.drawImage(backgroundVideo, 0, 0, canvas.width, canvas.height);

    // Récupérer les données du pixel
    const pixel = context.getImageData(0, 0, 1, 1).data;
    const [r, g, b] = [pixel[0], pixel[1], pixel[2]];

    // Déterminer la couleur du texte
    headerTitle.style.color = isDarkColor(r, g, b) ? "white" : "black";
}



document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    } else {
        console.error("L'élément menu-toggle ou nav n'a pas été trouvé !");
    }
});

