document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) {
        console.log("Sidebar NOT found");
        return;
    }

    function spawnPtero() {

        const ptero = document.createElement('div');
        ptero.className = 'sidebar-ptero';

        // random horizontal position
        const x = Math.random() * 80;
        ptero.style.left = `${x}%`;

        // random size
        const scale = 0.7 + Math.random() * 1.2;
        ptero.style.width = `${120 * scale}px`;

        // start above screen
        let pos = -200;
        ptero.style.top = pos + "px";

        // create inner wrapper
        const inner = document.createElement('div');
        inner.className = 'ptero-inner';

        // create video
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

        // random speed
        const speed = 1 + Math.random() * 2;

        // movement state
        let pos = -200;
        let xPos = x;
        let drift = (Math.random() - 0.5) * 1.5;
        let wobbleOffset = Math.random() * 1000;
        
        const speed = 0.8 + Math.random() * 2.5;
        
        const move = setInterval(() => {
        
            pos += speed;
        
            // slow horizontal drift
            xPos += drift;
        
            // occasional random direction change
            if (Math.random() < 0.02) {
                drift += (Math.random() - 0.5) * 1.5;
            }
        
            // sine wave “air wobble”
            const wobble = Math.sin((pos + wobbleOffset) * 0.02) * 2;
        
            ptero.style.top = pos + "px";
            ptero.style.left = (xPos + wobble) + "%";
        
            // remove when out of view
            if (pos > window.innerHeight + 300) {
                clearInterval(move);
                ptero.remove();
            }
        
        }, 20);
    }

    // first bird immediately
    spawnPtero();

    // continuous spawning
    setInterval(spawnPtero, 2000);

});
