export default function Display({ isPowerOn, drumPads, selectedId, volume, isAdjustingVolume }) {
    let drumPadName = "";
    if (selectedId) {
        drumPadName = drumPads.find(drumPad => drumPad.id === selectedId).name;
    }

    let className = "text-bg-warning bg-gradient"
    if (isPowerOn) {
        className += " bg-opacity-75"
    } else {
        className += " bg-opacity-25"
    }

    return (
        <div id="display" className={className}>
            {isAdjustingVolume ? `Volume: ${Math.floor(volume * 100)}` : drumPadName}
        </div>
    )
}