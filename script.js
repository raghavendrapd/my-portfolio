// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;

    for (var i = 0; i < reveals.length; i++) {
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Canvas Star Particles
const canvas = document.getElementById('star-particles');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.alpha = Math.random();
        this.velocity = Math.random() * 0.02 + 0.005;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Twinkle effect
        this.alpha += this.fadeDir * 0.01;
        if (this.alpha <= 0.1) {
            this.fadeDir = 1;
        } else if (this.alpha >= Math.random() * 0.8 + 0.2) {
            this.fadeDir = -1;
        }

        // Slight upward drift
        this.y -= this.velocity;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }

        this.draw();
    }
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
