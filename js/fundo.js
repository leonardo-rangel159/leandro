document.addEventListener("DOMContentLoaded", function() {
    // Lista de imagens e vídeo
    const imagens = [
        'imagem/fundos/2.jpg',
        'imagem/fundos/3.jpg',
        'imagem/fundos/4.jpg',
        'imagem/fundos/5.jpg',
        'imagem/fundos/6.jpg',
        'imagem/fundos/7.jpg',
        'imagem/fundos/8.jpg',
        'imagem/fundos/1.jpg'
    ];

    const video = 'imagem/fundos/1.mp4'; // Substitua pelo nome do seu vídeo

    const backgroundVideo = document.getElementById('background-video');
    let currentImageIndex = 0;

    // Função para mudar o fundo
    function mudarFundo() {
        if (currentImageIndex < imagens.length) {
            backgroundVideo.style.display = 'none'; // Esconde o vídeo
            document.body.style.backgroundImage = `url('${imagens[currentImageIndex]}')`; // Define a imagem de fundo
            document.body.style.backgroundColor = "#000"; // Define uma cor de fundo
            currentImageIndex++;
        } else {
            currentImageIndex = 0;
            backgroundVideo.style.display = 'block'; // Mostra o vídeo
            backgroundVideo.src = video; // Define o vídeo
            backgroundVideo.play(); // Inicia o vídeo
        }
    }

    // Muda o fundo a cada 5 segundos
    setInterval(mudarFundo, 5000);
});
