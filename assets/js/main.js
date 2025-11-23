window.addEventListener("load", () => {
    const metroReadout = document.getElementById("metro-readout");
    const metroStart = document.getElementById("metro-start");
    const peixesSection = document.getElementById("peixes");

    if (!metroReadout || !metroStart || !peixesSection) {
        console.error("Erro: Um dos elementos (metro-readout, metro-start ou peixes) não foi encontrado.");
        return;
    }

    const peixesAbsoluteTop = peixesSection.offsetTop;
    const peixesHeight = peixesSection.offsetHeight;
    const startTriggerPoint = peixesAbsoluteTop + (peixesHeight * 0.1);

    let scrollTimer = null;
    let isCounting = false;
    let startRulerY = 0;

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const peixesRect = peixesSection.getBoundingClientRect();
        const peixesTop = peixesRect.top;
        const peixesBottom = peixesRect.bottom;

        const inSection = peixesTop < windowHeight && peixesBottom > 0;
        const hasReachedTriggerPoint = scrollY >= startTriggerPoint;

        clearTimeout(scrollTimer);

        if (inSection && hasReachedTriggerPoint) {
            if (!isCounting) {
                isCounting = true;
                startRulerY = scrollY;
            }

            const distance = Math.max(0, (scrollY - startRulerY) / 10);
            metroReadout.textContent = `${distance.toFixed(1)} Metros`;

            metroReadout.classList.add("is-active");
            metroStart.classList.add("is-active");

            scrollTimer = setTimeout(() => {
                metroReadout.classList.remove("is-active");
                metroStart.classList.remove("is-active");
            }, 2000);

        } else {
            isCounting = false;
            metroReadout.classList.remove("is-active");
            metroStart.classList.remove("is-active");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn[data-name]');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;

    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
                cartCount.style.transform = 'translate(25%, -25%) scale(1.3)';
                setTimeout(() => {
                    cartCount.style.transform = 'translate(25%, -25%) scale(1)';
                }, 200);
            }
        });
    });
});