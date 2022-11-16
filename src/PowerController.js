import Form from 'react-bootstrap/Form';

export default function PowerController({ isPowerOn, onChange }) {
    return (
        <div className="switch">
            <div>Power</div>
            <Form.Switch
                id="power-switch"
                checked={isPowerOn}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}