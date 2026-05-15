document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const MAX_BIRDS = 15;
    let tabActive = true;

    document.addEventListener("visibilitychange", () => {
        tabActive = !document.hidden;
    });

    function spawnPtero() {

        if (document.querySelectorAll('.sidebar-ptero').length >= MAX_BIRDS) return;

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
        // INIT
        // =========================
        let pos = -200;
        let xPos = 0;

        let speed = 0.8 + Math.random() * 2.5;
        let drift = (Math.random() - 0.5) * 1.2;

        const wobbleOffset = Math.random() * 1000;
        let angle = 0;

        const BASE_ANGLE = 90;

        const sidebarRect = sidebar.getBoundingClientRect();
        const birdWidth = 120 * (0.7 + Math.random() * 1.2);

        // FIXED: pixel-only positioning
        const maxX = Math.max(0, sidebarRect.width - birdWidth);
        xPos = Math.random() * maxX;

        ptero.style.width = `${birdWidth}px`;
        ptero.style.left = `${xPos}px`;
        ptero.style.top = `${pos}px`;

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

            // drift movement (stable decay)
            drift *= 0.98;

            // soft steering so they don't escape
            if (xPos < 20) drift += 0.05;
            if (xPos > maxX - 20) drift -= 0.05;

            drift += (Math.random() - 0.5) * 0.02;

            xPos += drift;

            // clamp inside sidebar
            xPos = Math.max(0, Math.min(maxX, xPos));

            // wobble flight path
            const wobble = Math.sin((pos + wobbleOffset) * 0.02) * 2;

            // banking rotation
            const targetAngle = drift * 15;
            angle += (targetAngle - angle) * 0.08;

            // APPLY POSITION (PIXELS ONLY)
            ptero.style.top = `${pos}px`;
            ptero.style.left = `${xPos + wobble}px`;

            // rotate bird
            ptero.style.transform = `rotate(${angle + BASE_ANGLE}deg)`;

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
