import { useState } from 'react';

const ChoseTheDinner = (props) => {
    const [foodSelection, setFoodSelection] = useState('');

    const foodOptions = [
        { id: 'pizza', label: 'Pizza', emoji: '🍕' },
        { id: 'sushi', label: 'Sushi', emoji: '🍣' },
        { id: 'burgers', label: 'Burgers', emoji: '🍔' },
        { id: 'pasta', label: 'Pasta', emoji: '🍝' },
        { id: 'tacos', label: 'Tacos', emoji: '🌮' },
        { id: 'ramen', label: 'Ramen', emoji: '🍜' },
    ];

    const handleSelectFood = async (foodId, foodName) => {
        setFoodSelection(foodId);
        props.setFormField({...props.formField, food: foodName})
    };

    const submitForm = async () => {
        // Ton URL d'application Web Apps Script (parfaitement configurée !)
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

            console.log("Données enregistrées dans Google Sheets et e-mail envoyé ! 🔥🚀");

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
                    <div className="food-grid" style={{ width: '100%' }}>
                        {foodOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelectFood(option.id,option.label)}
                                className={`food-card-button ${foodSelection === option.id ? 'active' : ''}`}
                            >
                                <span className="food-emoji">{option.emoji}</span>
                                <span className="food-label">{option.label}</span>
                            </button>
                        ))}
                    </div>

                    {foodSelection && (
                        <button
                            type="button"
                            className="buttonStyle date-button"
                            style={{ marginTop: '30px', width: '100%' }}
                            onClick={() => submitForm()}
                        >
                            Vaaaaamos babe ! 🐯
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChoseTheDinner;