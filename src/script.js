import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const loadingScreen = document.getElementById('loadingScreen');
const loadingDots = document.getElementById('loadingDots');

let dotCount = 0;
const maxDots = 3; // Maximum number of dots to show

// Function to update the loading dots
const updateLoadingDots = () => {
    dotCount = (dotCount + 1) % (maxDots + 1);
    loadingDots.innerHTML = '.'.repeat(dotCount);
};

// Update the dots every 500 milliseconds
const dotInterval = setInterval(updateLoadingDots, 400);

const loadingManager = new THREE.LoadingManager(
    // Called when all assets are loaded
    () => {
        clearInterval(dotInterval); // Clear the interval when loading is complete
        gsap.to(loadingScreen, { opacity: 0, duration: 1, onComplete: () => {
            loadingScreen.style.display = 'none';
        }});
    },
    // Called when an asset starts loading
    (itemUrl, itemsLoaded, itemsTotal) => {
        console.log(`Loading asset: ${itemUrl}. Loaded ${itemsLoaded} of ${itemsTotal} files.`);
    },
    // Called when an asset fails to load
    (url) => {
        console.error(`There was an error loading ${url}`);
    }
);


const artsLink = document.querySelector('.digital-arts-link');
const engineerLink = document.querySelector('.engineer-link');
const mentorLink = document.querySelector('.mentor-link');
const skillsList = document.querySelector('.skill-set ul');
const icon1 = document.querySelector('.icon-skill-1')
const icon2 = document.querySelector('.icon-skill-2')
const icon3 = document.querySelector('.icon-skill-3')
const imageElement = document.getElementById("myImg");

imageElement.addEventListener("mouseover", function() {
    imageElement.src = "cartoon2.png";
});

imageElement.addEventListener("mouseout", function() {
    imageElement.src = "cartoon.png";
});


artsLink.addEventListener('click', function (event) {
    event.preventDefault();
    icon2.classList.remove('displayNone')
    icon1.classList.add('displayNone')
    icon3.classList.add('displayNone')
    engineerLink.classList.remove('bold')
    mentorLink.classList.remove('bold')    
    artsLink.classList.add('bold')
    skillsList.classList.add('fade-out');
    gsap.fromTo(icon2, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.to(icon1, { opacity: 0, duration: 0.5 });
    gsap.to(icon3, { opacity: 0, duration: 0.5 });
    setTimeout(() => {
        skillsList.innerHTML = `
            <li>ExpressJs</li>
            <li>Flask</li>
            <li>Docker</li>
            <li>DataBase</li>
            <li>RestApi</li>
        `;
        skillsList.classList.remove('fade-out');
    }, 300); // Set delay time (in milliseconds)
});

engineerLink.addEventListener('click', function (event) {
    event.preventDefault();
    icon1.classList.remove('displayNone')
    icon2.classList.add('displayNone')
    icon3.classList.add('displayNone')
    artsLink.classList.remove('bold')    
    mentorLink.classList.remove('bold')    
    engineerLink.classList.add('bold')
    skillsList.classList.add('fade-out');
    gsap.fromTo(icon1, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.to(icon2, { opacity: 0, duration: 0.5 });
    gsap.to(icon3, { opacity: 0, duration: 0.5 });
    setTimeout(() => {
        skillsList.innerHTML = `
            <li>HTML/CSS</li>
            <li>Javascript</li>
            <li>ThreeJS</li>
            <li>React</li>
            <li>Bootstrap</li>
        `;
        skillsList.classList.remove('fade-out');
    }, 300);
});

mentorLink.addEventListener('click', function (event) {
    event.preventDefault();
    icon3.classList.remove('displayNone')
    icon2.classList.add('displayNone')
    icon1.classList.add('displayNone')
    engineerLink.classList.remove('bold')    
    artsLink.classList.remove('bold')    
    mentorLink.classList.add('bold')
    skillsList.classList.add('fade-out');
    gsap.fromTo(icon3, { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.to(icon1, { opacity: 0, duration: 0.5 });
    gsap.to(icon2, { opacity: 0, duration: 0.5 });
    setTimeout(() => {
        skillsList.innerHTML = `
            <li>Game-Dev</li>
            <li>3D Modeling</li>
            <li>Animation</li>
            <li>Design</li>
            <li>Teaching</li>
        `;
        skillsList.classList.remove('fade-out');
    }, 300);
});


/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader(loadingManager)

const gltfLoader = new GLTFLoader(loadingManager)
let mixer;
let gltfModel;
gltfLoader.load(
    'car.glb',
    (gltf) => 
    {
        gltfModel = gltf.scene;
        // Ubah materi objek jika perlu
        scene.add(gltfModel);
        gltfModel.position.set(2,-2.5,0)
        mixer = new THREE.AnimationMixer(gltf.scene)
        const clips = gltf.animations;
        clips.forEach(function(clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
});



/**
 * Debug
 */
// const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//texture

const gradient = textureLoader.load("textures/gradients/3.jpg")
gradient.magFilter = THREE.NearestFilter


//objects
const group = new THREE.Group()
const material = new THREE.MeshToonMaterial({color:parameters.materialColor})
material.gradientMap = gradient

const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({color:"white",wireframe:true})
    )
const mesh3 = new THREE.Mesh(
    new THREE.TetrahedronGeometry(),
    new THREE.MeshBasicMaterial({color:"white"})
    )
    mesh3.position.x = -0.2
group.add(mesh1, mesh3)
group.visible = false
const mesh2 = new THREE.Mesh(
    new THREE.TorusGeometry( 1,.3,18,50),
    new THREE.MeshBasicMaterial({color:"white",wireframe:true})
    )


scene.add(group,mesh2)


const distance = 8
group.position.y = - distance * 1 -3.5
mesh2.position.y = - distance * 1
group.position.x = 1.8
mesh2.position.x = -2
mesh1.scale.set(1,1,1)

//light
const light = new THREE.PointLight("white", 2 , 10)
light.position.set(2,.5,1)
const ambientLight = new THREE.AmbientLight("white",0.1)
scene.add(light,ambientLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    console.log(sizes.width) ////  hi chat gpt tolong bantu ketika widht ini mencapai nilai <500 kamera akan mundur


    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// group

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 15 saat widht <500
camera.position.z = 6

cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//scroll

let scrollY = window.scrollY
let currentSection = 0
let cubeAn = false

const targetscale = new THREE.Vector3(1.3,1.3,1.3);


window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY/sizes.height)
    if (newSection == 2 && cubeAn == false ) {
        gsap.to(mesh2.scale, {
            duration: 0.5,
            ease: 'power2.inOut',
            x: targetscale.x,
            y: targetscale.y,
            z: targetscale.z,
        });
        cubeAn = true    
    }

    if (newSection !== 2) {
        cubeAn = false
        gsap.to(mesh2.scale, {
            duration: 0.1,
            ease: 'power2.inOut',
            x: 0.1,
            y: 0.1,
            z: 0.1,
        });
    }
   
    
})


// mouse position
const cursor = {}
cursor.x = 0
cursor.y = 0

let isDragging = false;
let isRotateCameraEnabled = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

const toRadians = (angle) => {
    return angle * (Math.PI / 180);
};

const onMouseDown = (event) => {
    if (isRotateCameraEnabled) {
        isDragging = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
};

const onMouseMove = (event) => {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0),
                toRadians(deltaMove.x * 0.2),
                0,
                'XYZ'
            ));

        camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    } else {
        if (!isRotateCameraEnabled) {
            cursor.x = event.clientX / sizes.width - 0.5
            cursor.y = event.clientY / sizes.height - 0.5
        }
    }
};

const onMouseUp = () => {
    isDragging = false;
};

const onTouchStart = (event) => {
    if (isRotateCameraEnabled && event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
};

const onTouchMove = (event) => {
    if (isDragging && event.touches.length === 1) {
        const deltaMove = {
            x: event.touches[0].clientX - previousMousePosition.x,
            y: event.touches[0].clientY - previousMousePosition.y
        };

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0),
                toRadians(deltaMove.x * 0.2),
                0,
                'XYZ'
            ));

        camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);

        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
};

const onTouchEnd = () => {
    isDragging = false;
};

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);

const rotateCameraButton = document.getElementById('rotateCameraButton');
rotateCameraButton.addEventListener('click', () => {
    isRotateCameraEnabled = !isRotateCameraEnabled;
    rotateCameraButton.style.backgroundColor = isRotateCameraEnabled ? '#aed581' : '#82d0f1';
    rotateCameraButton.textContent = isRotateCameraEnabled ? 'Disable Rotate' : 'Rotate Camera';
});

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

window.addEventListener('touchstart', onTouchStart);
window.addEventListener('touchmove', onTouchMove);
window.addEventListener('touchend', onTouchEnd);







const meshes = [group,mesh2]

// particle
const particleCount = 100
const position = new Float32Array(particleCount * 3)

for(let i = 0; i < particleCount; i++)
{
    position[i * 3 + 0 ] = (Math.random() - 0.5) * 10
    position[i * 3 + 1 ] = distance * 0.5    - Math.random() * distance * 3
    position[i * 3 + 2 ] = (Math.random() -0.5) * 10
}

const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03
})

const particles = new THREE.Points(particleGeometry,particlesMaterial)
scene.add(particles)
/**
 * Animate
 */
const clock = new THREE.Clock()
function animate() {
    if(mixer)
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //animation camera
    camera.position.y = -scrollY / sizes.height * 4
    
    const parallaxX = cursor.x
    const parallaxY = -cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.02
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.02

    //animation meshes
    for (const i of meshes)
    {
        i.rotation.x += deltaTime * 0.1
        i.rotation.y += deltaTime * 0.13
        i.rotation.z += deltaTime * 0.14
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()