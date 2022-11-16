import Form from 'react-bootstrap/Form';

export default function VolumeController({ isPowerOn, volume, onChange }) {
    return (
        <div className="volume-controler">
            <Form.Range
                disabled={!isPowerOn}
                defaultValue={volume}
                min="0"
                max="1"
                step="0.01"
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}