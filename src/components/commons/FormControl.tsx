import React from 'react'
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap'

/**
 * Componente de controle de formulário.
 * 
 * @param {string} label
 * @param {string} type
 * @param {string} error
 * @param {function(e:Event)} handleChange Ativado no evento onChange do Input
 * @param {string} value
 * @param {string} name
 * @param {string} placeholder
 */
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