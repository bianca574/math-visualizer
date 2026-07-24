import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function Scene3D({ width = 420, height = 420, build }) {
    const mountRef = useRef(null)
    const stateRef = useRef(null)

    // set up the renderer, camera, and static scene furniture ONCE
    useEffect(() => {
        const mount = mountRef.current
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('#151a22')

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
        camera.position.set(4, 3, 5)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        mount.appendChild(renderer.domElement)

        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        scene.add(new THREE.GridHelper(6, 12, 0x8b96a8, 0x26303c))
        scene.add(new THREE.AxesHelper(3))

        const content = new THREE.Group()
        scene.add(content)

        let frameId
        function animate() {
            controls.update()
            renderer.render(scene, camera)
            frameId = requestAnimationFrame(animate)
        }
        animate()

        stateRef.current = { content }

        return () => {
            cancelAnimationFrame(frameId)
            controls.dispose()
            renderer.dispose()
            mount.removeChild(renderer.domElement)
        }
    }, [width, height])

    // rebuild just the transformable content whenever `build` changes
    useEffect(() => {
        const s = stateRef.current
        if (!s || !build) return

        while (s.content.children.length) {
            const obj = s.content.children.pop()
            obj.traverse((child) => {
                child.geometry?.dispose()
                child.material?.dispose()
            })
            s.content.remove(obj)
        }
        build(s.content, THREE)
    }, [build])

    return (
        <div
            ref={mountRef}
            className="rounded-lg border border-ink-700 overflow-hidden"
            style={{ width, height }}
        />
    )
}