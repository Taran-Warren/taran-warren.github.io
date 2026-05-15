document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) return;

    const MAX_BIRDS = 15;
    let tabActive = true;

    // pause when tab is hidden
    document.addEventListener("visibilitychange", () => {
        tabActive = !document.hidden;
    });

    function spawnPtero() {

        // limit total birds
        if (document.querySelectorAll('.sidebar-ptero').length >= MAX_BIRDS) {
            return;
        }

        const ptero = document.createElement('div');
        ptero.className = 'sidebar-ptero';

        const inner = document.createElement('div');
        inner.className = 'ptero-inner';

        const video = document.createElement('video');
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const source = document.createElement('source');
        source.src = 'images/flying.webm';
        source.type = 'video/webm';

        video.appendChild(source);
        inner.appendChild(video);
        ptero.appendChild(inner);

        sidebar.appendChild(ptero);

        // random spawn properties
        let pos = -200;
        let xPos = Math.random() * 80;

        const speed = 0.8 + Math.random() * 2.5;
        let drift = (Math.random() - 0.5) * 1.5;
        const wobbleOffset = Math.random() * 1000;

        ptero.style.width = `${120 * (0.7 + Math.random() * 1.2)}px`;
        ptero.style.left = `${xPos}%`;
        ptero.style.top = pos + "px";

        const move = setInterval(() => {

            // safety: stop if removed
            if (!document.body.contains(ptero)) {
                clearInterval(move);
                return;
            }

            pos += speed;

            // horizontal drift
            xPos += drift;

            // occasional direction change
            if (Math.random() < 0.02) {
                drift += (Math.random() - 0.5) * 1.5;
            }

            // sine wave flight wobble
            const wobble = Math.sin((pos + wobbleOffset) * 0.02) * 2;

            ptero.style.top = pos + "px";
            ptero.style.left = (xPos + wobble) + "%";

            // cleanup
            if (pos > window.innerHeight + 300) {
                clearInterval(move);
                ptero.remove();
            }

        }, 20);

        // hard safety cleanup (prevents leaks)
        setTimeout(() => {
            if (ptero.parentElement) {
                ptero.remove();
            }
        }, 30000);
    }

    function spawnLoop() {
        if (tabActive) {
            spawnPtero();
        }

        setTimeout(spawnLoop, 2000);
    }

    // start system
    spawnPtero();
    spawnLoop();

});
