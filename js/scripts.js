const worksLink = document.querySelector('.works-link');
const aboutLink = document.querySelector('.about-link');
const nameText = document.querySelector('.name.logo'); // Select the h1 element with both name and logo classes
const projectLinks = document.querySelectorAll('.projects');

const worksOffset = 0; // Adjust the initial offset for Works link movement
const aboutOffset = 10; // Adjust the initial offset for About link movement

let mouseX = 0;
let mouseY = 0;
let time = 0;
const speed = 0.004; // Adjust the speed of the movement

function updateMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const skewAmount = 5; // Adjust the amount of skew transformation

  const skewX = (mouseX / window.innerWidth - 0.5) * skewAmount;
  const skewY = (mouseY / window.innerHeight - 0.5) * skewAmount;

  nameText.style.transform = `skew(${skewX}deg, ${skewY}deg) translateX(${skewX}px) translateY(${skewY}px)`;
}

document.addEventListener('mousemove', updateMousePosition);

function animateLinks() {
  const worksXMovement = worksOffset + Math.sin(time) * 10 + mouseY / window.innerHeight * 8 - 4;
  const worksYMovement = worksOffset + Math.cos(time) * 10 + mouseX / window.innerWidth * 8 - 4;

  const aboutXMovement = aboutOffset + Math.sin(time * -1) * 6 + mouseY / window.innerHeight * 4 - 2;
  const aboutYMovement = aboutOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

  worksLink.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px) skewX(${worksYMovement / 2}deg) skewY(${worksXMovement / 2}deg)`;
  aboutLink.style.transform = `translateX(${aboutXMovement}px) translateY(${aboutYMovement}px) skewX(${aboutYMovement / 2}deg) skewY(${aboutXMovement / 2}deg)`;
  nameText.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px)`;

  projectLinks.forEach((link, index) => {
    const projectOffset = index * 10; // Adjust the initial offset for each project
    const projectXMovement = projectOffset + Math.sin(time) * 6 + mouseY / window.innerHeight * 4 - 2;
    const projectYMovement = projectOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

    link.style.transform = `translateX(${projectXMovement}px) translateY(${projectYMovement}px) skewX(${projectYMovement / 10}deg) skewY(${projectXMovement / -4}deg)`;
  });

  time += speed;
  requestAnimationFrame(animateLinks);
}

animateLinks();
