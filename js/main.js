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
hamburger.addEventListener("click", () => header.classList.toggle("open"))