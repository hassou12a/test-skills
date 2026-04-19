import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export default function BackgroundSpline() {
    const [splineLoaded, setSplineLoaded] = useState(false);

    // Skip Spline on mobile / low-end devices
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 2;

    if (isMobile || isLowEnd) return null;

    function onLoad(splineApp) {
        setSplineLoaded(true);
        try {
            // Comprehensive list of fragments to excise
            const targets = [
                'Building', 'Services', 'Crafting', 'Design', 'Contact Us',
                'Get Started', 'Text', 'Awesome', 'Logo', 'Watermark', 'Branding',
                'Contact', 'Us', 'Button', 'Oval', 'Shape', 'Experience',
                'in', 'ences', 'Sciences', 'ding', 'ing'
            ];

            const hideRecursive = (obj) => {
                if (!obj) return;
                const name = (obj.name || '');

                if (targets.some(t => name.toLowerCase().includes(t.toLowerCase()))) {
                    obj.visible = false;
                    if (obj.scale) obj.scale.set(0, 0, 0);
                }

                if (obj.children) {
                    obj.children.forEach(hideRecursive);
                }
            };

            // Run hiding logic multiple times to fight internal Spline animations
            const attemptHiding = () => {
                const scene = splineApp.scene || splineApp._scene;
                if (scene) {
                    hideRecursive(scene);
                } else {
                    targets.forEach(name => {
                        const obj = splineApp.findObjectByName(name);
                        if (obj) hideRecursive(obj);
                    });
                }
            };

            // Run immediately and then every second for 5 seconds
            attemptHiding();
            const interval = setInterval(attemptHiding, 1000);
            setTimeout(() => clearInterval(interval), 10000);

            // Keep zoom natural to prevent "giant text" syndrome
            splineApp.setZoom(1.0);
        } catch {
            // Ignore Spline api errors
        }
    }

    return (
        <div className="global-spline-bg" style={{ opacity: splineLoaded ? 1 : 0, transition: 'opacity 1.5s ease' }}>
            <Suspense fallback={null}>
                <Spline
                    scene="https://prod.spline.design/Y6KA0CwzEl3DJGww/scene.splinecode"
                    onLoad={onLoad}
                />
            </Suspense>
        </div>
    );
}
