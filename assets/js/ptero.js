document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const MAX_BIRDS = 15;
    let tabActive = true;

    document.addEventListener("visibilitychange", () => {
        tabActive = !document.hidden;
    });

    function spawnPtero() {

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

        // =========================
        // INITIAL VALUES
        // =========================
        let pos = -200;
        let xPos = Math.random() * 80;

        let speed = 0.8 + Math.random() * 2.5;
        let drift = (Math.random() - 0.5) * 1.5;

        const wobbleOffset = Math.random() * 1000;

        let angle = 0;

        ptero.style.width = `${120 * (0.7 + Math.random() * 1.2)}px`;
        ptero.style.top = pos + "px";
        ptero.style.left = xPos + "%";

        // =========================
        // MOVEMENT LOOP
        // =========================
        const move = setInterval(() => {

            if (!document.body.contains(ptero)) {
                clearInterval(move);
                return;
            }

            if (!tabActive) return;

            pos += speed;

            xPos += drift;

            // random wind shift
            if (Math.random() < 0.02) {
                drift += (Math.random() - 0.5) * 1.2;
            }

            // wobble flight path
            const wobble = Math.sin((pos + wobbleOffset) * 0.02) * 2;

            // banking angle (smooth)
            const targetAngle = drift * 10;
            angle += (targetAngle - angle) * 0.08;

            // APPLY POSITION
            ptero.style.top = pos + "px";
            ptero.style.left = (xPos + wobble) + "%";

            // IMPORTANT: rotate INNER (not outer)
            ptero.style.transform = `rotate(${angle}deg)`;

            // cleanup
            if (pos > window.innerHeight + 300) {
                clearInterval(move);
                ptero.remove();
            }

        }, 20);

        // safety cleanup
        setTimeout(() => {
            if (ptero.parentElement) {
                ptero.remove();
            }
        }, 30000);
    }

    function loop() {
        if (tabActive) spawnPtero();
        setTimeout(loop, 2000);
    }

    spawnPtero();
    loop();

});
