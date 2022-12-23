Array.from(document.querySelectorAll(".internal-link")).forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        let target = document.querySelector(link.getAttribute("href"));
        window.scrollTo({
            top: target.offsetTop - 120,
            behavior: 'smooth'
        });
        header.classList.toggle("open", false);
    })
})


const hamburger = document.getElementById("hamburger");
const header = document.querySelector("header");
hamburger.addEventListener("click", () => {
    header.classList.toggle("open")
    document.body.classList.toggle("open")
})
window.addEventListener("DOMContentLoaded", () => {
    animateScrollStatus();
    gradientCanvas();
    //window.scrollTo({top: 0, behavior: "smooth"})
})

const animateScrollStatus = () => {
    const scrollTracker = document.querySelector("#scroll-status-container");
    let timeline = new ScrollTimeline({
        source: document.scrollingElement,
        orientation: "block",
        scrollOffsets: [CSS.percent(0), CSS.percent(100)]
    });

    scrollTracker.animate(
        { width: ["0%", "100%"] },
        {
            duration: 1,
            timeline: timeline
        }
    )
}

const gradientCanvas = () => {
    const canvas = document.querySelector('#gradient-canvas-container canvas');
    const context = canvas.getContext('2d');
    let time = 0;

    const color = function (x, y, r, g, b) {
        // console.log(`rgb(${r}, ${g}, ${b})`)
        context.fillStyle = `rgb(${r}, ${g}, ${b})`
        context.fillRect(x, y, 10, 10);
    }
    const R = function (x, y, time) {
        let r = (Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + time)));
        return Math.min(r, 140)
    }

    const G = function (x, y, time) {
        let g = (Math.floor(192 + 64 * Math.sin((x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300)));
        return Math.min(g, 130)
    }

    const B = function (x, y, time) {
        return (Math.floor(192 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
    }

    const startAnimation = function () {
        for (x = 0; x <= 30; x++) {
            for (y = 0; y <= 30; y++) {
                color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
            }
        }
        time = time + 0.1;
        window.requestAnimationFrame(startAnimation);
    }

    startAnimation();
}
