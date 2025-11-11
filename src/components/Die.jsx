export default function Die(props) {
    return (
        <button 
        className="die" 
        style={{backgroundColor: props.isHeld ? "#59E391" : "white"}}
        onClick={() => props.hold(props.id)}
        aria-pressed={props.isHeld}
        aria-label={`Die with a value ${props.value}, ${props.isHeld ? "held": "not held"}`}
        >{props.value}</button>
    )
}