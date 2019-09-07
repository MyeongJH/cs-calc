import React from 'react';
import { Box, Button, CheckBox, Form, FormField, RadioButtonGroup, Select } from 'grommet';
import { Add } from 'grommet-icons';

function CalcForm() {
    return (
        <Form>
            <FormField name="location" label="장소" />
            <FormField name="totalCost" label="총금액" type="number" />
            <Button primary icon={<Add />} onClick={() => {}} />
        </Form>
    );
}

export default CalcForm;
