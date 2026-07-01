import { useState } from 'react'
import '../../App.css'

const AskingForADate = (props) => {
    // Stocke la position du bouton "Non" { x, y }
    // Au début, il est "null" pour rester sagement à sa place d'origine
    const [noBtnPosition, setNoBtnPosition] = useState(null);

    // Fonction magique qui fait fuir le bouton
    const handleMouseEnterNo = (e) => {
        const button = e.target;
        // On récupère les dimensions du carré blanc (le parent)
        const container = button.parentElement.parentElement;
        const containerRect = container.getBoundingClientRect();

        // Largeur et hauteur disponibles à l'intérieur du carré (en enlevant les paddings)
        const padding = 40;
        const maxX = containerRect.width - button.offsetWidth - padding;
        const maxY = containerRect.height - button.offsetHeight - padding;

        // Génération de coordonnées aléatoires dans cet espace
        const randomX = Math.random() * maxX + padding / 2;
        const randomY = Math.random() * maxY + padding / 2;

        // On applique la nouvelle position
        setNoBtnPosition({
            x: randomX,
            y: randomY
        });
    };

    // Style dynamique pour le bouton "Non" s'il a bougé
    const noBtnStyle = noBtnPosition ? {
        position: 'absolute',
        left: `${noBtnPosition.x}px`,
        top: `${noBtnPosition.y}px`,
        zIndex: 10,
        transition: 'all 0.1s ease-out' // Léger effet de glissade pour la fuite
    } : {};

    return (
        <div className="central-card-container">
            <div className="catContainer">
                <img
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzlraXM2azd1MXNjZnBjMmNqMGZ1cHNyMThidXQ1MDl2c3RkbG5heiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vFKqnCdLPNOKc/giphy.gif"
                    alt="chat qui joue avec ses pattes"
                    className="catGif"
                />
            </div>
            <h1 className="central-card-title">{`🌸 Ça te dirait de dîner avec moi un soir ${props.myDateName} ? 🌸`}</h1>
            <div className="buttons-container">
                <button
                    className="btn btn-yes"
                    onClick={() => props.setIsYes(true)}
                >
                    Oui... 🤍
                </button>

                <button
                    className="btn btn-no"
                    style={noBtnStyle}
                    onMouseEnter={handleMouseEnterNo}
                >
                    Non... 🙈
                </button>
            </div>
        </div>
    );
}

export default AskingForADate;