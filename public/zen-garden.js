document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("zenCanvas");
    const ctx = canvas.getContext("2d");
    let drawing = false;
    let rakeStyle = "round";
    let sandColor = "#f9f6ef";
    let rakeColor = "#bfa76f";

    // Set initial sand color
    canvas.style.background = sandColor;

    // Toolbar controls
    document.getElementById("rakeStyle").onchange = e => rakeStyle = e.target.value;
    document.getElementById("sandColor").onchange = e => {
        sandColor = e.target.value;
        canvas.style.background = sandColor;
    };
    document.getElementById("rakeColor").onchange = e => rakeColor = e.target.value;

    function getLineWidth() {
        if (rakeStyle === "round") return 10;
        if (rakeStyle === "flat") return 20;
        if (rakeStyle === "fine") return 4;
        return 8;
    }

    function startDraw(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(
            e.offsetX || (e.touches && e.touches[0].clientX - canvas.getBoundingClientRect().left),
            e.offsetY || (e.touches && e.touches[0].clientY - canvas.getBoundingClientRect().top)
        );
    }

    function draw(e) {
        if (!drawing) return;
        let x, y;
        if (e.touches) {
            x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        } else {
            x = e.offsetX;
            y = e.offsetY;
        }
        ctx.lineTo(x, y);
        ctx.strokeStyle = rakeColor;
        ctx.lineWidth = getLineWidth();
        ctx.lineCap = rakeStyle === "flat" ? "butt" : "round";
        ctx.stroke();
    }

    function endDraw() {
        drawing = false;
        ctx.closePath();
    }

    // Mouse events
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);

    // Touch events for mobile
    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchmove", function(e) {
        draw(e);
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchend", endDraw);

    // Clear button
    document.getElementById("clearZen").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
});