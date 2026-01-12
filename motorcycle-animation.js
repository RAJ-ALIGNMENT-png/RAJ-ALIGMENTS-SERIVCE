// Cinematic 3D Motorcycle Animation
class MotorcycleScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.motorcycle = null;
        this.lasers = [];
        this.technicalOverlays = [];
        this.animationTime = 0;
        this.cameraPath = [];
        this.currentCameraIndex = 0;
        this.init();
    }

    init() {
        this.setupScene();
        this.createLighting();
        this.createMotorcycle();
        this.createLasers();
        this.createTechnicalOverlays();
        this.createEnvironment();
        this.setupCameraPath();
        this.animate();
    }

    setupScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

        // Camera setup
        const canvas = document.getElementById('motorcycle-scene');
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
    }

    createLighting() {
        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);

        // Main key light
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
        keyLight.position.set(5, 10, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048;
        keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 50;
        keyLight.shadow.camera.left = -10;
        keyLight.shadow.camera.right = 10;
        keyLight.shadow.camera.top = 10;
        keyLight.shadow.camera.bottom = -10;
        this.scene.add(keyLight);

        // Rim lighting
        const rimLight1 = new THREE.DirectionalLight(0x4488ff, 0.8);
        rimLight1.position.set(-5, 3, -5);
        this.scene.add(rimLight1);

        const rimLight2 = new THREE.DirectionalLight(0xff4444, 0.6);
        rimLight2.position.set(5, 3, -5);
        this.scene.add(rimLight2);

        // Soft fill lights
        const fillLight1 = new THREE.PointLight(0xffffff, 0.5, 10);
        fillLight1.position.set(0, 2, 3);
        this.scene.add(fillLight1);

        const fillLight2 = new THREE.PointLight(0x8888ff, 0.3, 8);
        fillLight2.position.set(-3, 1, 0);
        this.scene.add(fillLight2);

        // Workshop overhead lights
        for (let i = 0; i < 3; i++) {
            const workshopLight = new THREE.PointLight(0xffaa44, 0.4, 15);
            workshopLight.position.set((i - 1) * 4, 8, -2);
            this.scene.add(workshopLight);
        }
    }

    createMotorcycle() {
        const motorcycleGroup = new THREE.Group();

        // Kawasaki Ninja H2 colors and materials
        const darkGreenMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a4a3a, // Dark green
            metalness: 0.9,
            roughness: 0.2
        });
        const blackMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a, // Black
            metalness: 0.7,
            roughness: 0.4
        });
        const redAccentMaterial = new THREE.MeshStandardMaterial({
            color: 0xcc0000, // Red accents
            metalness: 0.8,
            roughness: 0.3
        });
        const chromeMaterial = new THREE.MeshStandardMaterial({
            color: 0xcccccc, // Chrome/metal
            metalness: 0.95,
            roughness: 0.1
        });

        // Main body/tank/seat - flowing H2 design
        const mainBodyGeometry = new THREE.BoxGeometry(0.9, 0.7, 1.6);
        const mainBody = new THREE.Mesh(mainBodyGeometry, darkGreenMaterial);
        mainBody.position.set(0, 0.6, 0);
        mainBody.rotation.x = -0.1;
        mainBody.castShadow = true;
        motorcycleGroup.add(mainBody);

        // Front fairing - aggressive H2 styling
        const frontFairingGeometry = new THREE.BoxGeometry(1.1, 0.9, 1.2);
        const frontFairing = new THREE.Mesh(frontFairingGeometry, darkGreenMaterial);
        frontFairing.position.set(0, 0.8, 1.1);
        frontFairing.rotation.x = -0.3;
        frontFairing.castShadow = true;
        motorcycleGroup.add(frontFairing);

        // Side fairings with red accents
        const leftFairingGeometry = new THREE.BoxGeometry(0.4, 0.5, 0.8);
        const leftFairing = new THREE.Mesh(leftFairingGeometry, darkGreenMaterial);
        leftFairing.position.set(-0.5, 0.5, 0.3);
        leftFairing.rotation.y = 0.2;
        leftFairing.castShadow = true;
        motorcycleGroup.add(leftFairing);

        const rightFairingGeometry = new THREE.BoxGeometry(0.4, 0.5, 0.8);
        const rightFairing = new THREE.Mesh(rightFairingGeometry, darkGreenMaterial);
        rightFairing.position.set(0.5, 0.5, 0.3);
        rightFairing.rotation.y = -0.2;
        rightFairing.castShadow = true;
        motorcycleGroup.add(rightFairing);

        // Red accent stripes
        const redStripeGeometry = new THREE.BoxGeometry(0.05, 0.02, 1.8);
        const leftRedStripe = new THREE.Mesh(redStripeGeometry, redAccentMaterial);
        leftRedStripe.position.set(-0.4, 0.6, 0);
        motorcycleGroup.add(leftRedStripe);

        const rightRedStripe = new THREE.Mesh(redStripeGeometry, redAccentMaterial);
        rightRedStripe.position.set(0.4, 0.6, 0);
        motorcycleGroup.add(rightRedStripe);

        // Windscreen
        const windscreenGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
        const windscreenMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.7,
            roughness: 0.2
        });
        const windscreen = new THREE.Mesh(windscreenGeometry, windscreenMaterial);
        windscreen.position.set(0, 1.2, 1.5);
        windscreen.rotation.x = 0.3;
        motorcycleGroup.add(windscreen);

        // Tail section - sharp H2 design
        const tailGeometry = new THREE.BoxGeometry(0.8, 0.5, 1.0);
        const tailSection = new THREE.Mesh(tailGeometry, darkGreenMaterial);
        tailSection.position.set(0, 0.5, -1.1);
        tailSection.rotation.x = -0.4;
        tailSection.castShadow = true;
        motorcycleGroup.add(tailSection);

        // Tail light (red accent)
        const tailLightGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.05);
        const tailLight = new THREE.Mesh(tailLightGeometry, redAccentMaterial);
        tailLight.position.set(0, 0.3, -1.5);
        motorcycleGroup.add(tailLight);

        // Front suspension - inverted forks
        const forkGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 16);
        const forkMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.95,
            roughness: 0.05
        });
        
        const leftFork = new THREE.Mesh(forkGeometry, forkMaterial);
        leftFork.position.set(-0.18, 0.9, 1.0);
        leftFork.castShadow = true;
        motorcycleGroup.add(leftFork);

        const rightFork = new THREE.Mesh(forkGeometry, forkMaterial);
        rightFork.position.set(0.18, 0.9, 1.0);
        rightFork.castShadow = true;
        motorcycleGroup.add(rightFork);

        // Triple clamp
        const tripleClampGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
        const tripleClamp = new THREE.Mesh(tripleClampGeometry, chromeMaterial);
        tripleClamp.position.set(0, 1.4, 1.0);
        tripleClamp.rotation.x = Math.PI / 2;
        tripleClamp.castShadow = true;
        motorcycleGroup.add(tripleClamp);

        // Wheels - sport bike style
        const wheelGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24);
        const wheelMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontWheel.position.set(0, 0.35, 1.0);
        frontWheel.rotation.x = Math.PI / 2;
        frontWheel.castShadow = true;
        motorcycleGroup.add(frontWheel);

        const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        rearWheel.position.set(0, 0.35, -1.0);
        rearWheel.rotation.x = Math.PI / 2;
        rearWheel.castShadow = true;
        motorcycleGroup.add(rearWheel);

        // Tires
        const tireGeometry = new THREE.TorusGeometry(0.35, 0.12, 8, 24);
        const tireMaterial = new THREE.MeshStandardMaterial({
            color: 0x222222,
            roughness: 0.9
        });
        
        const frontTire = new THREE.Mesh(tireGeometry, tireMaterial);
        frontTire.position.set(0, 0.35, 1.0);
        frontTire.rotation.x = Math.PI / 2;
        frontTire.castShadow = true;
        motorcycleGroup.add(frontTire);

        const rearTire = new THREE.Mesh(tireGeometry, tireMaterial);
        rearTire.position.set(0, 0.35, -1.0);
        rearTire.rotation.x = Math.PI / 2;
        rearTire.castShadow = true;
        motorcycleGroup.add(rearTire);

        // Clip-on handlebars
        const handlebarGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 12);
        const handlebarMaterial = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.2
        });
        
        const leftClipOn = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
        leftClipOn.position.set(-0.35, 1.3, 0.95);
        leftClipOn.rotation.z = Math.PI / 2;
        leftClipOn.castShadow = true;
        motorcycleGroup.add(leftClipOn);

        const rightClipOn = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
        rightClipOn.position.set(0.35, 1.3, 0.95);
        rightClipOn.rotation.z = Math.PI / 2;
        rightClipOn.castShadow = true;
        motorcycleGroup.add(rightClipOn);

        // Engine block
        const engineGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.6);
        const engine = new THREE.Mesh(engineGeometry, blackMaterial);
        engine.position.set(0, 0.3, 0);
        engine.castShadow = true;
        motorcycleGroup.add(engine);

        // Exhaust system - prominent H2 exhaust
        const exhaustGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 16);
        const exhaust = new THREE.Mesh(exhaustGeometry, chromeMaterial);
        exhaust.position.set(0.15, 0.5, -0.8);
        exhaust.rotation.z = 0.15;
        exhaust.castShadow = true;
        motorcycleGroup.add(exhaust);

        // Muffler
        const mufflerGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16);
        const muffler = new THREE.Mesh(mufflerGeometry, chromeMaterial);
        muffler.position.set(0.2, 0.6, -1.4);
        muffler.rotation.x = Math.PI / 2;
        muffler.castShadow = true;
        motorcycleGroup.add(muffler);

        // Swingarm
        const swingarmGeometry = new THREE.BoxGeometry(0.08, 0.06, 1.2);
        const swingarm = new THREE.Mesh(swingarmGeometry, blackMaterial);
        swingarm.position.set(0.2, 0.4, -0.6);
        swingarm.rotation.x = 0.1;
        swingarm.castShadow = true;
        motorcycleGroup.add(swingarm);

        // Brake calipers (red)
        const caliperGeometry = new THREE.BoxGeometry(0.1, 0.06, 0.12);
        const frontCaliper = new THREE.Mesh(caliperGeometry, redAccentMaterial);
        frontCaliper.position.set(0, 0.35, 1.0);
        frontCaliper.castShadow = true;
        motorcycleGroup.add(frontCaliper);

        const rearCaliper = new THREE.Mesh(caliperGeometry, redAccentMaterial);
        rearCaliper.position.set(0, 0.35, -1.0);
        rearCaliper.castShadow = true;
        motorcycleGroup.add(rearCaliper);

        // Brake discs
        const discGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 24);
        const discMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const frontDisc = new THREE.Mesh(discGeometry, discMaterial);
        frontDisc.position.set(0, 0.35, 0.95);
        frontDisc.rotation.x = Math.PI / 2;
        frontDisc.castShadow = true;
        motorcycleGroup.add(frontDisc);

        const rearDisc = new THREE.Mesh(discGeometry, discMaterial);
        rearDisc.position.set(0, 0.35, -0.95);
        rearDisc.rotation.x = Math.PI / 2;
        rearDisc.castShadow = true;
        motorcycleGroup.add(rearDisc);

        // Chain and sprocket
        const sprocketGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20);
        const sprocket = new THREE.Mesh(sprocketGeometry, chromeMaterial);
        sprocket.position.set(0, 0.35, -1.0);
        sprocket.rotation.x = Math.PI / 2;
        sprocket.castShadow = true;
        motorcycleGroup.add(sprocket);

        // Front fender
        const fenderGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.3);
        const frontFender = new THREE.Mesh(fenderGeometry, blackMaterial);
        frontFender.position.set(0, 0.25, 1.0);
        frontFender.rotation.x = -0.1;
        frontFender.castShadow = true;
        motorcycleGroup.add(frontFender);

        this.motorcycle = motorcycleGroup;
        this.motorcycle.position.set(0, 1, 0);
        this.scene.add(this.motorcycle);
        console.log('Kawasaki Ninja H2 added to scene');
    }

    createLasers() {
        // Front wheel laser
        const frontLaserGeometry = new THREE.CylinderGeometry(0.001, 0.001, 3, 8);
        const frontLaserMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.8
        });
        const frontLaser = new THREE.Mesh(frontLaserGeometry, frontLaserMaterial);
        frontLaser.position.set(0, 0.3, 0.8);
        frontLaser.rotation.z = Math.PI / 2;
        this.lasers.push(frontLaser);
        this.scene.add(frontLaser);

        // Rear wheel laser
        const rearLaserGeometry = new THREE.CylinderGeometry(0.001, 0.001, 3, 8);
        const rearLaserMaterial = new THREE.MeshBasicMaterial({
            color: 0x0088ff,
            transparent: true,
            opacity: 0.8
        });
        const rearLaser = new THREE.Mesh(rearLaserGeometry, rearLaserMaterial);
        rearLaser.position.set(0, 0.3, -0.8);
        rearLaser.rotation.z = Math.PI / 2;
        this.lasers.push(rearLaser);
        this.scene.add(rearLaser);

        // Fork alignment laser
        const forkLaserGeometry = new THREE.CylinderGeometry(0.001, 0.001, 2, 8);
        const forkLaserMaterial = new THREE.MeshBasicMaterial({
            color: 0xff4444,
            transparent: true,
            opacity: 0.6
        });
        
        const leftForkLaser = new THREE.Mesh(forkLaserGeometry, forkLaserMaterial);
        leftForkLaser.position.set(-0.15, 0.6, 0.8);
        leftForkLaser.rotation.x = Math.PI / 2;
        this.lasers.push(leftForkLaser);
        this.scene.add(leftForkLaser);

        const rightForkLaser = new THREE.Mesh(forkLaserGeometry, forkLaserMaterial);
        rightForkLaser.position.set(0.15, 0.6, 0.8);
        rightForkLaser.rotation.x = Math.PI / 2;
        this.lasers.push(rightForkLaser);
        this.scene.add(rightForkLaser);

        // Chassis alignment laser
        const chassisLaserGeometry = new THREE.CylinderGeometry(0.001, 0.001, 2.5, 8);
        const chassisLaserMaterial = new THREE.MeshBasicMaterial({
            color: 0x44ff44,
            transparent: true,
            opacity: 0.5
        });
        const chassisLaser = new THREE.Mesh(chassisLaserGeometry, chassisLaserMaterial);
        chassisLaser.position.set(0, 0.1, 0);
        chassisLaser.rotation.z = Math.PI / 2;
        this.lasers.push(chassisLaser);
        this.scene.add(chassisLaser);
    }

    createTechnicalOverlays() {
        // Measurement grid
        const gridGeometry = new THREE.PlaneGeometry(4, 4);
        const gridMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const grid = new THREE.Mesh(gridGeometry, gridMaterial);
        grid.position.set(0, -0.5, 0);
        grid.rotation.x = -Math.PI / 2;
        this.technicalOverlays.push(grid);
        this.scene.add(grid);

        // Angle markers
        for (let i = 0; i < 4; i++) {
            const angleGeometry = new THREE.RingGeometry(0.5, 0.6, 32, 1, 0, Math.PI / 2);
            const angleMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.2,
                side: THREE.DoubleSide
            });
            const angleMarker = new THREE.Mesh(angleGeometry, angleMaterial);
            angleMarker.position.set(
                Math.cos(i * Math.PI / 2) * 1.5,
                0,
                Math.sin(i * Math.PI / 2) * 1.5
            );
            angleMarker.rotation.x = -Math.PI / 2;
            this.technicalOverlays.push(angleMarker);
            this.scene.add(angleMarker);
        }

        // Measurement lines
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        });

        for (let i = 0; i < 3; i++) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-2, 0.5 + i * 0.5, -2),
                new THREE.Vector3(2, 0.5 + i * 0.5, -2)
            ]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            this.technicalOverlays.push(line);
            this.scene.add(line);
        }
    }

    createEnvironment() {
        // Service stand
        const standGeometry = new THREE.BoxGeometry(0.8, 0.1, 2.5);
        const standMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.7,
            roughness: 0.3
        });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(0, 0.9, 0);
        stand.receiveShadow = true;
        this.scene.add(stand);

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Background tools (decorative)
        const toolPositions = [
            { x: -3, y: 1, z: -2 },
            { x: 3, y: 1, z: -2 },
            { x: -2, y: 0.5, z: -3 },
            { x: 2, y: 0.5, z: -3 }
        ];

        toolPositions.forEach(pos => {
            const toolGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.5);
            const toolMaterial = new THREE.MeshStandardMaterial({
                color: 0x666666,
                metalness: 0.8,
                roughness: 0.2
            });
            const tool = new THREE.Mesh(toolGeometry, toolMaterial);
            tool.position.set(pos.x, pos.y, pos.z);
            tool.rotation.y = Math.random() * Math.PI;
            this.scene.add(tool);
        });

        // Garage walls (subtle)
        const wallGeometry = new THREE.PlaneGeometry(20, 10);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.9
        });

        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(0, 5, -5);
        this.scene.add(backWall);

        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.position.set(-5, 5, 0);
        leftWall.rotation.y = Math.PI / 2;
        this.scene.add(leftWall);

        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.position.set(5, 5, 0);
        rightWall.rotation.y = -Math.PI / 2;
        this.scene.add(rightWall);
    }

    setupCameraPath() {
        this.cameraPath = [
            // Front view
            { 
                position: new THREE.Vector3(0, 1.5, 3), 
                target: new THREE.Vector3(0, 0.5, 1.0),
                duration: 3.0
            },
            // Right side view
            { 
                position: new THREE.Vector3(3.5, 1.2, 0), 
                target: new THREE.Vector3(0, 0.5, 0),
                duration: 4.0
            },
            // Rear view
            { 
                position: new THREE.Vector3(0, 1.5, -3), 
                target: new THREE.Vector3(0, 0.5, -1.0),
                duration: 3.0
            },
            // Left side view
            { 
                position: new THREE.Vector3(-3.5, 1.2, 0), 
                target: new THREE.Vector3(0, 0.5, 0),
                duration: 4.0
            }
        ];
        
        // Calculate total duration for smooth looping
        this.totalDuration = this.cameraPath.reduce((sum, point) => sum + point.duration, 0);
        this.segmentDurations = [];
        let accumulatedDuration = 0;
        
        this.cameraPath.forEach(point => {
            this.segmentDurations.push(accumulatedDuration);
            accumulatedDuration += point.duration;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.animationTime += 0.005;

        // Rotate motorcycle slowly for dynamic presentation
        if (this.motorcycle) {
            this.motorcycle.rotation.y = Math.sin(this.animationTime * 0.5) * 0.15;
        }

        // Animate lasers with pulsing effect
        this.lasers.forEach((laser, index) => {
            laser.material.opacity = 0.6 + Math.sin(this.animationTime * 3 + index * 0.5) * 0.4;
        });

        // Animate technical overlays with subtle breathing
        this.technicalOverlays.forEach((overlay, index) => {
            if (overlay.material) {
                overlay.material.opacity = 0.15 + Math.sin(this.animationTime * 2 + index * 0.3) * 0.1;
            }
        });

        // Advanced camera movement along path
        this.updateCameraMovement();

        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    updateCameraMovement() {
        // Loop the animation
        const currentTime = (this.animationTime * 2) % this.totalDuration;
        
        // Find current segment
        let currentSegment = 0;
        for (let i = this.segmentDurations.length - 1; i >= 0; i--) {
            if (currentTime >= this.segmentDurations[i]) {
                currentSegment = i;
                break;
            }
        }
        
        // Handle segment transitions
        if (currentSegment < this.cameraPath.length - 1) {
            const currentPoint = this.cameraPath[currentSegment];
            const nextPoint = this.cameraPath[currentSegment + 1];
            
            // Calculate progress within current segment
            const segmentStartTime = this.segmentDurations[currentSegment];
            const segmentDuration = currentPoint.duration;
            const segmentProgress = (currentTime - segmentStartTime) / segmentDuration;
            
            // Smooth interpolation using ease-in-out
            const easedProgress = this.easeInOutCubic(Math.min(Math.max(segmentProgress, 0), 1));
            
            // Interpolate camera position
            this.camera.position.lerpVectors(
                currentPoint.position,
                nextPoint.position,
                easedProgress
            );
            
            // Interpolate look-at target
            const currentTarget = currentPoint.target;
            const nextTarget = nextPoint.target;
            
            const lookAtTarget = new THREE.Vector3().lerpVectors(
                currentTarget,
                nextTarget,
                easedProgress
            );
            
            this.camera.lookAt(lookAtTarget);
        } else {
            // Handle the last segment looping back to first
            const lastPoint = this.cameraPath[this.cameraPath.length - 1];
            const firstPoint = this.cameraPath[0];
            
            const segmentStartTime = this.segmentDurations[this.segmentDurations.length - 1];
            const segmentDuration = lastPoint.duration;
            const segmentProgress = (currentTime - segmentStartTime) / segmentDuration;
            
            const easedProgress = this.easeInOutCubic(Math.min(Math.max(segmentProgress, 0), 1));
            
            this.camera.position.lerpVectors(
                lastPoint.position,
                firstPoint.position,
                easedProgress
            );
            
            const lookAtTarget = new THREE.Vector3().lerpVectors(
                lastPoint.target,
                firstPoint.target,
                easedProgress
            );
            
            this.camera.lookAt(lookAtTarget);
        }
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    smoothStep(t) {
        return t * t * (3 - 2 * t);
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing MotorcycleScene...');
    window.motorcycleScene = new MotorcycleScene();
    console.log('MotorcycleScene initialized');

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.motorcycleScene) {
            window.motorcycleScene.handleResize();
        }
    });
});
