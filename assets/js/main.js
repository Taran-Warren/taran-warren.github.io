window.__siteBuild = 3;

// Remove the preload class once loaded so the template's animations/transitions
// can run (body.is-preload disables all of them with !important).
window.addEventListener("load", () => {
    document.body.classList.remove("is-preload");
});

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');

    // Flying pterodactyls are exclusive to the Pterodactyl project page.
    if (!sidebar || !document.body.classList.contains('ptero-page')) return;

    // Each bird is its own <video> fetching the same clip. Spawning them
    // unbounded saturates the browser's connection pool, so none of them ever
    // buffer — and it starves the main project video too. Cap the flock.
    const MAX_BIRDS = 5;

    function spawnPtero() {

        if (sidebar.querySelectorAll('.sidebar-ptero').length >= MAX_BIRDS) return;

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
    }, 3000);

});
document.addEventListener("DOMContentLoaded", () => {

    // Toggle nav submenus on click/tap (hover already handles desktop via CSS)
    document.querySelectorAll("#header nav ul li.submenu > a").forEach(link => {
        link.addEventListener("click", (e) => {
            const parent = link.parentElement;
            const isOpen = parent.classList.contains("active");

            document.querySelectorAll("#header nav ul li.submenu.active")
                .forEach(li => { if (li !== parent) li.classList.remove("active"); });

            if (link.getAttribute("href") === "#") {
                e.preventDefault();
                parent.classList.toggle("active", !isOpen);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#header nav ul li.submenu")) {
            document.querySelectorAll("#header nav ul li.submenu.active")
                .forEach(li => li.classList.remove("active"));
        }
    });

});
document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".scroll-nav a");
    const sections = Array.from(links).map(link =>
        document.querySelector(link.getAttribute("href"))
    );

    // The targets are headings (only ~30px tall), so testing whether one straddles
    // a fixed line almost never matches. Instead: highlight the last heading that
    // has scrolled above the threshold.
    const markActive = () => {

        const threshold = 160;
        let current = "";

        sections.forEach(section => {
            if (!section) return;
            if (section.getBoundingClientRect().top <= threshold) {
                current = section.id;
            }
        });

        // Before the first heading, keep the first entry highlighted.
        if (!current) {
            const first = sections.find(Boolean);
            if (first) current = first.id;
        }

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });

    };

    window.addEventListener("scroll", markActive, { passive: true });

    // Anchor jumps don't always emit a scroll event, so update on hash change too.
    window.addEventListener("hashchange", () => setTimeout(markActive, 50));
    links.forEach(link => link.addEventListener("click", () => setTimeout(markActive, 50)));

    markActive();

});
