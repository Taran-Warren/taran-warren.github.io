document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');

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
        sidebar.appendChild(ptero);

        // RANDOM X POSITION
        const x = Math.random() * 70;
        ptero.style.left = `${x}%`;

        // RANDOM SIZE
        const scale = 0.6 + Math.random() * 1.2;
        const size = 120 * scale;

        ptero.style.width = `${size}px`;

        // RANDOM SPEED
        const duration = 15 + Math.random() * 20;
        
        // START ABOVE SCREEN
        ptero.style.top = "-200px";
        
        // RANDOM ANIMATION
        const anims = ['fly1', 'fly2', 'fly3'];
        const anim = anims[Math.floor(Math.random() * anims.length)];

        ptero.style.animation = `${anim} ${duration}s linear forwards`;

        // REMOVE AFTER FINISH
        setTimeout(() => {
            ptero.remove();
        }, duration * 1000);
    }

    // initial spawn
    spawnPtero();

    // continuous spawning
    setInterval(() => {
        spawnPtero();
    }, 1800);

});
document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".scroll-nav a");
    const sections = Array.from(links).map(link =>
        document.querySelector(link.getAttribute("href"))
    );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {
            if (!section) return;

            const rect = section.getBoundingClientRect();

            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section.id;
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });

    });

});
