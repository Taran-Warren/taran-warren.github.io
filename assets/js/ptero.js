document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector('.sidebar');

    if (!sidebar) {
        alert("Sidebar NOT found");
        return;
    }

    alert("Sidebar found");

    function spawnPtero() {

        const ptero = document.createElement('div');
        ptero.className = 'sidebar-ptero';

        // TEMP DEBUG STYLE
        ptero.style.width = "80px";
        ptero.style.height = "80px";
        ptero.style.background = "red";
        ptero.style.position = "absolute";

        // RANDOM X
        const x = Math.random() * 80;
        ptero.style.left = `${x}%`;

        // START POSITION
        ptero.style.top = "-100px";

        sidebar.appendChild(ptero);

        // SIMPLE FALL
        let pos = -100;

        const move = setInterval(() => {
            pos += 2;
            ptero.style.top = pos + "px";

            if (pos > window.innerHeight) {
                clearInterval(move);
                ptero.remove();
            }

        }, 20);
    }

    spawnPtero();

    setInterval(spawnPtero, 1200);

});
