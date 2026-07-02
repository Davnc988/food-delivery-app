import "../../App.css"

const Loader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="spinner"></div>
        </div>
    )
}

export default Loader;