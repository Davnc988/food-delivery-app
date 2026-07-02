import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../../App.css'

const ReactionAfterSayingYes = (props) => {

    useEffect(() => {
        // Cette fonction se lance automatiquement à l'arrivée sur la page
        confetti({
            particleCount: 150, // Nombre de confettis
            spread: 80,         // Angle d'ouverture de l'explosion
            origin: { y: 0.6 }  // Position verticale (0.6 = légèrement en dessous du milieu)
        });
    }, []);

    return (
        <div className="central-card-container">

            <div className="catContainer">
                <img
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3R1MzVweTM5ZmwwYXBjcnZrOGlrZHgyc2U0ZnZ2NmxmdDhrcTd2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ov9jWu7BuHufyLs7m/giphy.gif"
                    alt="petite file qui fait du drift"
                    className="catGif"
                />
            </div>
            <h1 className="central-card-title">Attends, tu as vraiement dis oui ?? 😭 😭</h1>
            <p className="secondMessage">Je m'attendais téllement à ce que tu dises non ... 🥹</p>
            <div className="buttons-container">
                {/* Bouton OUI : Fixe au centre */}
                <button
                    className="btn btn-yes"
                    onClick={() => props.setStartingPlanning(true)}
                >
                    Okay, okay ➡️
                </button>
            </div>
        </div>
    );
}

export default ReactionAfterSayingYes;