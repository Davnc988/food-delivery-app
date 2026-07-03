import { useState } from 'react';
import '../App.css';

const Form = () => {
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const prenomFormate = btoa(unescape(encodeURIComponent(prenom)));
        const emailFormate = btoa(unescape(encodeURIComponent(email)));
        const currentDomain = window.location.origin;

        const fullUrl = `${currentDomain}/form?for=${prenomFormate}&to=${emailFormate}`;
        setGeneratedUrl(fullUrl);
        setIsCopied(false);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
        } catch (err) {
            console.error("Impossible de copier le lien : ", err);
        }
    };

    return (
        <div className="central-card-container centrage-form">
            <div className="cardStyle">
                <h2 className="form-title">
                    « Si t'y es là c'est parce que t'y es un <span style={{ fontStyle: 'normal', fontWeight: 'bold', color: '#b33939' }}>TIGRE</span>,<br/>ne l'oublie pas ! »
                </h2>

                <form onSubmit={handleSubmit} className="formStyle" >
                    <input
                        type="text"
                        placeholder="Prénom de la personne à inviter"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="inputStyle"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Ton email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputStyle"
                        required
                    />

                    <button type="submit" className="buttonStyle">
                        Let's go bébé !
                    </button>
                </form>

                {generatedUrl && (
                    <div className="linkContainerStyle">
                        <p className="linkSubtitle">Ton invitation est prête ! 🔥</p>
                        <div className="inputCopyGroup">
                            <input
                                type="text"
                                value={generatedUrl}
                                readOnly
                                className="inputStyle linkInput"
                            />
                            <button type="button" onClick={handleCopy} className="copyButtonStyle">
                                {isCopied ? "Copié ! ✅" : "Copier 📋"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Home = () => {

    const containerStyle = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff', // Fond blanc
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
    };

    return (
        <div style={containerStyle}>
            {/* 🔥 FLAMMES À GAUCHE */}
            <div className="tiger-wrapper tiger-left">
                <span className="tiger-emoji">🐯</span>
                <div className="fire-burst">
                    <div className="flame-particle"></div>
                    <div className="flame-particle"></div>
                    <div className="flame-particle"></div>
                </div>
            </div>

            <Form />

            {/* 🔥 FLAMMES À DROITE */}
            <div className="tiger-wrapper tiger-right">
                <span className="tiger-emoji">🐯</span>
                <div className="fire-burst">
                    <div className="flame-particle"></div>
                    <div className="flame-particle"></div>
                    <div className="flame-particle"></div>
                </div>
            </div>
        </div>
    );
};

export default Home;