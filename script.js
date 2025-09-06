const container = document.querySelector('.scroller');

// Функция для парсинга имени файла
function parseFileName(filePath) {
    const fileName = filePath.split('/').pop().replace('.mp4','');
    const [author, ...descParts] = fileName.split('_');
    return { author, description: descParts.join(' ') };
}

// Получаем список видео с PHP
fetch('videos.php')
.then(res => res.json())
.then(videos => {
    videos.forEach(src => {
        const { author, description } = parseFileName(src);

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.height = '100vh';
        wrapper.style.width = '100%';

        const videoEl = document.createElement('video');
        videoEl.src = src;
        videoEl.muted = true;
        videoEl.playsInline = true;
        videoEl.preload = 'auto';
        videoEl.controls = false;
        videoEl.style.width = '100%';
        videoEl.style.height = '100%';
        videoEl.style.objectFit = 'cover';
        wrapper.appendChild(videoEl);

        const info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = `<div id="author">@${author}</div><div id="description">${description}</div>`;
        wrapper.appendChild(info);

        container.appendChild(wrapper);
    });

    // IntersectionObserver для автозапуска видео
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if(entry.intersectionRatio > 0.5){
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: [0.5] });

    document.querySelectorAll('.scroller > div').forEach(v => observer.observe(v));
});
