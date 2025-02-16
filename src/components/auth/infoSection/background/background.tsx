import Particles from './particles/particles';

export default function ParticlesBackground() {
    return (
        <div className="absolute inset-0">
            <Particles
                className="w-full h-full"
                particleColors={['#ffffff', '#ffffff']}
                particleCount={400}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={false}
                alphaParticles={true}
                disableRotation={false}
            />
        </div>
    );
}