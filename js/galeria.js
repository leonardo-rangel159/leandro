// script.js
document.addEventListener("DOMContentLoaded", function () {
    fetch('galerias.json')
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.getElementById('gallery-container');
            data.forEach((gallery, index) => {
                const galleryDiv = document.createElement('div');
                galleryDiv.className = 'gallery';
                galleryDiv.innerHTML = `<h2>${gallery.nome}</h2>`;
                
                const carouselDiv = document.createElement('div');
                carouselDiv.className = 'carousel';
                
                const carouselImagesDiv = document.createElement('div');
                carouselImagesDiv.className = 'carousel-images';
                
                gallery.imagens.forEach((imagem) => {
                    const mediaElement = document.createElement(imagem.src.endsWith('.mp4') ? 'video' : 'img');
                    mediaElement.src = imagem.src;
                    mediaElement.alt = imagem.descricao;
                    mediaElement.controls = imagem.src.endsWith('.mp4');
                    mediaElement.classList.add('media');
                    mediaElement.onclick = () => openFullscreen(gallery.imagens, imagem.src); // Modificado para passar as imagens
                    carouselImagesDiv.appendChild(mediaElement);
                });

                const prevButton = document.createElement('button');
                prevButton.innerHTML = '❮';
                prevButton.onclick = () => moveCarousel(carouselImagesDiv, -1, index);

                const nextButton = document.createElement('button');
                nextButton.innerHTML = '❯';
                nextButton.onclick = () => moveCarousel(carouselImagesDiv, 1, index);

                const controlsDiv = document.createElement('div');
                controlsDiv.className = 'carousel-controls';
                controlsDiv.appendChild(prevButton);
                controlsDiv.appendChild(nextButton);
                
                carouselDiv.appendChild(carouselImagesDiv);
                carouselDiv.appendChild(controlsDiv);
                galleryDiv.appendChild(carouselDiv);
                galleryContainer.appendChild(galleryDiv);
            });
        });
});

function moveCarousel(carousel, direction, index) {
    const totalItems = carousel.children.length;
    let currentIndex = (parseInt(carousel.dataset.currentIndex) || 0) + direction;

    if (currentIndex < 0) currentIndex = totalItems - 1;
    if (currentIndex >= totalItems) currentIndex = 0;

    carousel.style.transform = `translateX(-${currentIndex * 25}%)`;
    carousel.dataset.currentIndex = currentIndex;
}

// Função para abrir a mídia em tela cheia
function openFullscreen(images, currentSrc) {
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-container';
    
    let currentIndex = images.findIndex(img => img.src === currentSrc);

    fullscreenContainer.innerHTML = `
        <div class="fullscreen-content">
            <span class="close" onclick="closeFullscreen()">&times;</span>
            <div class="fullscreen-media">
                <img src="${currentSrc}" alt="Fullscreen Media" class="fullscreen-media-element" />
            </div>
            <p class="fullscreen-description">${images[currentIndex].descricao}</p> <!-- Descrição adicionada -->
            
        </div>
    `;
    document.body.appendChild(fullscreenContainer);
    document.body.style.overflow = 'hidden';
    fullscreenContainer.querySelector('.close').focus();
}

// Função para fechar a tela cheia
function closeFullscreen() {
    const fullscreenContainer = document.querySelector('.fullscreen-container');
    if (fullscreenContainer) {
        document.body.removeChild(fullscreenContainer);
        document.body.style.overflow = 'auto'; // Reabilita o scroll da página
    }
}

// Função para mudar a mídia na tela cheia
function changeMedia(direction, images, currentIndex) {
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    const newMedia = images[newIndex];
    const fullscreenMediaElement = document.querySelector('.fullscreen-media-element');
    const fullscreenDescription = document.querySelector('.fullscreen-description');

    fullscreenMediaElement.src = newMedia.src;
    fullscreenMediaElement.alt = newMedia.descricao;
    fullscreenDescription.textContent = newMedia.descricao; // Atualiza a descrição

    currentIndex = newIndex;
}
