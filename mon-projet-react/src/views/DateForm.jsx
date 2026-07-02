import { useRef, useEffect, useState } from 'react'
import '../App.css'
import { useSearchParams } from 'react-router-dom';
import AskingForADate from './dateSteps/AskingForADate.jsx';
import ReactionAfterSayingYes from './dateSteps/ReactionAfterSayingYes.jsx';
import CollectDateAndTime from './dateSteps/CollectDateAndTime.jsx';
import ChoseTheDinner from "./dateSteps/ChoseTheDinner.jsx";
import DatingFormSummary from "./dateSteps/DatingFormSummary.jsx";

function DateForm() {
    const canvasRef = useRef(null);
    const [isYes, setIsYes] = useState(false);
    const [startingPlanning, setStartingPlanning] = useState(false);
    const [isTimeToChoseTheFood, setIsTimeToChoseTheFood] = useState(false);
    const [allInfosAreCollected, setAllInfosAreCollected] = useState(false);
    const [searchParams] = useSearchParams();
    const [formField, setFormField] = useState({
        mail: decodeURIComponent(escape(atob(searchParams.get('to')))),
        date: '',
        time: '',
        food: '',
    });

    const myDateName = decodeURIComponent(escape(atob(searchParams.get('for'))));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Ajuster le canvas à la taille de l'écran
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Configuration des pétales
        const petalsCount = 40; // Nombre de fleurs simultanées
        const petalsArray = [];
        const sakuraEmoji = '🌸';

        // Initialisation d'un pétale
        class Petal {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 15 + 15; // Taille de la police (entre 15px et 30px)
                this.speedX = Math.random() * 1.5 - 0.5; // Balancement horizontal
                this.speedY = Math.random() * 1 + 1; // Vitesse de chute
                this.opacity = Math.random() * 0.6 + 0.4; // Transparence aléatoire
                this.angle = Math.random() * 360;
                this.spin = Math.random() * 0.02 - 0.01; // Vitesse de rotation
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y / 30) * 0.5; // Effet de vent sinusoïdal
                this.angle += this.spin;

                // Si la fleur dépasse le bas de l'écran, on la réinitialise en haut
                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                    this.speedY = Math.random() * 1 + 1;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.font = `${this.size}px serif`;

                // Déplacement du contexte pour gérer la rotation de l'emoji
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Centrer l'emoji lors du dessin
                ctx.fillText(sakuraEmoji, -this.size / 2, this.size / 2);
                ctx.restore();
            }
        }

        // Remplir le tableau de pétales
        for (let i = 0; i < petalsCount; i++) {
            petalsArray.push(new Petal());
        }

        // Boucle d'animation
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            petalsArray.forEach((petal) => {
                petal.update();
                petal.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Nettoyage à la destruction du composant
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Styles pour bloquer le canvas en arrière-plan
    const canvasStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1, // Derrière le texte mais devant le fond blanc
        pointerEvents: 'none', // Permet de cliquer à travers les fleurs
    };

    const containerStyle = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff', // Fond blanc
        overflow: 'hidden',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2, // Par-dessus les fleurs
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontFamily: 'sans-serif',
    };

    const renderStep = () => {
        if (!isYes) return <AskingForADate setIsYes={setIsYes} myDateName={myDateName} />;
        if (!startingPlanning) return <ReactionAfterSayingYes setStartingPlanning={setStartingPlanning} />;
        if (!isTimeToChoseTheFood) return <CollectDateAndTime setIsTimeToChoseTheFood={setIsTimeToChoseTheFood} formField={formField} setFormField={setFormField} />;
        if (!allInfosAreCollected) return <ChoseTheDinner formField={formField} setFormField={setFormField} setAllInfosAreCollected={setAllInfosAreCollected} />;

        return <DatingFormSummary formField={formField} />;
    };

    return (
        <div style={containerStyle}>
            <canvas ref={canvasRef} style={canvasStyle} />
            <div style={contentStyle}>
                {renderStep()}
            </div>
        </div>
    );
}

export default DateForm
