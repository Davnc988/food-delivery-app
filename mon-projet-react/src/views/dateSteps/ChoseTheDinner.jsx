import { useState } from 'react';
import Loader from './Loader';

const ChoseTheDinner = (props) => {
    const [foodSelection, setFoodSelection] = useState('');
    const [loading, setLoading] = useState(false);

    const foodOptions = [
        { id: 'pho-xao', label: 'Phở xào', emoji: '🍳' },
        { id: 'boeuf-thai', label: 'Pad gra prow', emoji: '🌶️' },
        { id: 'dry-pho', label: 'Dry phô', emoji: '🥢' },
        { id: 'bun-cha', label: 'Bún chả', emoji: '🧆' },
        { id: 'banh-xeo', label: 'Bánh xèo', emoji: '🥞' },
        { id: 'pho', label: 'Phô', emoji: '🍜' },
    ];

    const handleSelectFood = async (foodId, foodName) => {
        setFoodSelection(foodId);
        props.setFormField({...props.formField, food: foodName})
    };

    const submitForm = async () => {
        setLoading(true);
        const webAppUrl = "https://script.google.com/macros/s/AKfycbw5rhUnbZrBX1VoZhIfWyuH7gtpKL2I4bdpJbTvDPvinT0NIYEFNc_gEYkZ0tH5WEA-/exec";

        // Préparation des données d'invitation à envoyer au format JSON
        const dataToSend = {
            mail: props.formField.mail,
            date: props.formField.date,
            time: props.formField.time,
            food: props.formField.food
        };

        try {
            console.log("Envoi des données en cours au Sheets... 🐯");

            // Requête POST directe vers ton API Google Apps Script
            await fetch(webAppUrl, {
                method: 'POST',
                mode: 'no-cors', // Évite définitivement les erreurs CORS et 401/403 en local
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
            setLoading(false)

            console.log("Données enregistrées dans Google Sheets et e-mail envoyé ! 🔥🚀");
            props.setAllInfosAreCollected(true)

        } catch (error) {
            console.error("Erreur technique lors de l'envoi :", error);
        }
    };

    return (
        <div className="central-card-container">
            <div className="catContainer">
                <div className="date-card foodContainer">
                    {/* Titre de la section */}
                    <h2 className="date-title" style={{textAlign: 'center'}}>
                        Qu'aimerais-tu manger ? 🍜✨
                    </h2>

                    {/* Grille des choix de nourriture */}
                    <div className="food-grid" style={{width: '100%'}}>
                        {foodOptions.map((option) => (
                            <button
                                disabled={loading}
                                key={option.id}
                                type="button"
                                onClick={() => handleSelectFood(option.id, option.label)}
                                className={`food-card-button ${foodSelection === option.id ? 'active' : ''}`}
                            >
                                <span className="food-emoji">{option.emoji}</span>
                                <span className="food-label">{option.label}</span>
                            </button>
                        ))}
                    </div>

                    {foodSelection && (
                        <button
                            disabled={loading}
                            type="button"
                            className="buttonStyle date-button"
                            style={{marginTop: '30px', width: '100%'}}
                            onClick={() => submitForm()}
                        >
                            {loading ? <Loader/> : 'Vaaaaamos babe ! 🐯'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChoseTheDinner;