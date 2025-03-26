// 3D Animation for Hero Section
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add ambient and point lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xa100ff, 2, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create a glowing sphere
const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xa100ff, emissive: 0x4b0082, shininess: 100 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Particle system for starry background
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200; // Random positions
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 30;

//mobile settings
const navUl = document.querySelector('nav ul');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '☰';
document.querySelector('nav').appendChild(hamburger);

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('active');
});

// Mouse interaction
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 5 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    // Rotate sphere and particles
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    particles.rotation.y += 0.002;

    // Interactive camera movement based on mouse
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
    camera.lookAt(sphere.position);

    renderer.render(scene, camera);
}
animate();

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});