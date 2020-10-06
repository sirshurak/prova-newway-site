import React from 'react'
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap'

const FormControl = (props: any) => {
    const { label, type, error, handleChange, value, name, placeholder } = props;
    const _name = name ?? label?.toLowerCase();

    return (
        <FormGroup>
            <Label for={_name}>{label}</Label>
            <Input
                type={type}
                id={_name}
                invalid={!!error}
                onChange={handleChange}
                value={value}
                placeholder={placeholder}
            />
            <FormFeedback>{error}</FormFeedback>
        </FormGroup>
    )
}

export default FormControl