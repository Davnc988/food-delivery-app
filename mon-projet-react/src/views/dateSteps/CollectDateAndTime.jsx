import '../../App.css'

const CollectDateAndTime = (props) => {

    // 1. Date minimale : Aujourd'hui
    const aujourdhui = new Date();
    const minDateStr = aujourdhui.toISOString().split('T')[0];

    // 2. Date maximale de base : Aujourd'hui + 14 jours (2 semaines)
    const maxDate = new Date();
    maxDate.setDate(aujourdhui.getDate() + 21);

    // RÈGLE : Si la date max tombe en semaine (Lundi à Vendredi), on pousse jusqu'au week-end (Samedi)
    // En JavaScript : 0 = Dimanche, 1 = Lundi, ..., 5 = Vendredi, 6 = Samedi
    const jourDeLaSemaine = maxDate.getDay();

    if (jourDeLaSemaine >= 1 && jourDeLaSemaine <= 5) {
        // Nombre de jours restants pour atteindre le Samedi (jour 6)
        const joursJusquAuWeekend = 6 - jourDeLaSemaine;
        maxDate.setDate(maxDate.getDate() + joursJusquAuWeekend);
    }

    const maxDateStr = maxDate.toISOString().split('T')[0];

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        props.setIsTimeToChoseTheFood(true)
    };

    return (
        <div className="central-card-container">
            <div className="catContainer">
                <img
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExanJxYzU0amd6cjR2OGUyMnpjcjlnamxodGY2bDRxd2JiaXVvY2t1ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fNfjecL8gJfsv7wP5l/giphy.gif"
                    alt="calendrier"
                    className="catGif"
                />
            </div>
            <h1 className="central-card-title">Alors quand es tu disponible ?</h1>
            <form onSubmit={handleFinalSubmit} className="formStyle">

                {/* Bloc 1 : Choix du jour */}
                <div className="input-group">
                    <label className="input-label">Choisis une date  ✨</label>
                    <input
                        type="date"
                        value={props.formField.date}
                        onChange={(e) => props.setFormField({...props.formField, date: e.target.value})}
                        onClick={(e) => e.target.showPicker()} /* 🌟 Force l'ouverture du calendrier au clic */
                        min={minDateStr}
                        max={maxDateStr}
                        className="inputStyle date-input"
                        required
                    />
                </div>

                {/* Bloc 2 : Choix du moment (Optionnel, type Select) */}
                <div className="input-group">
                    <label className="input-label">Choisis une heure ⏰</label>
                    <select
                        value={props.formField.time}
                        onChange={(e) => props.setFormField({...props.formField, time: e.target.value})}
                        className="inputStyle date-input"
                        required
                    >
                        <option value="" disabled hidden>-- Select --</option>
                        <option value="17h30">17:30 - on mange avec les retraités</option>
                        <option value="18h30">18:30 - c'est le meilleur choix</option>
                        <option value="19h30">19:30 - on passe directement au plat de résistance...</option>
                        <option value="20h30">20:30 - je te sers un digestif ou un café ?</option>
                    </select>
                </div>

                {/* Bouton de validation final rose poudré */}
                <button type="submit" className="buttonStyle date-button">
                    Je confirme 💌
                </button>

            </form>
        </div>
    );
}

export default CollectDateAndTime;