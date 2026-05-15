function spawnPtero() {

    const ptero = document.createElement('div');
    ptero.className = 'sidebar-ptero';

    const inner = document.createElement('div');
    inner.className = 'ptero-inner';

    const video = document.createElement('video');

    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    video.src = 'images/flying.webm';

    inner.appendChild(video);
    ptero.appendChild(inner);

    // RANDOM SIZE
    const scale = 0.7 + Math.random() * 1.2;
    ptero.style.width = `${120 * scale}px`;

    ptero.style.position = "absolute";

    // RANDOM X
    const x = Math.random() * 80;
    ptero.style.left = `${x}%`;

    // START POSITION
    ptero.style.top = "-200px";

    sidebar.appendChild(ptero);

    // SIMPLE FALL
    let pos = -200;

    const speed = 1 + Math.random() * 3;

    const move = setInterval(() => {

        pos += speed;

        ptero.style.top = pos + "px";

        if (pos > window.innerHeight + 300) {

            clearInterval(move);
            ptero.remove();

        }

    }, 20);
}
