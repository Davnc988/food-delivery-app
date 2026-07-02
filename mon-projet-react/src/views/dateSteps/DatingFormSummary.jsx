import '../../App.css'
import React from "react";

const DatingFormSummary = (props) => {

    return (
        <div className="central-card-container">
            <div className="catContainer">
                <img
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGIzZ2gzN2pyeXh1Y2c4bnlqYjQzZ29zcWQ3d3hmdHVlZWFqdTB2OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J3CbFgn5o7DGRuE/giphy.gif"
                    alt="bob l'éponge qui dit bye"
                    className="catGif"
                />
            </div>
            <h1 className="central-card-title">
                Content que tu n'aies pas dit non. On se dit à{' '}
                <span style={{color: '#FF6B6B'}}>{props.formField.time}</span> le{' '}
                <span style={{color: '#FF6B6B'}}>
                    {new Date(props.formField.date).toLocaleDateString('fr-FR')}
                </span>
            </h1>            <p className="secondMessage">Bisous, bisous 😚 😚</p>
        </div>
    );
}

export default DatingFormSummary;