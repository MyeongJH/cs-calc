import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, TextArea, Text, DataTable } from 'grommet';
import { Add, LinkDown } from 'grommet-icons';

function CalcForm() {
    const [location, setA] = useState('');
    const [totalCost, setB] = useState(0);
    const [checked, setChecked] = useState([]);
    const members = [
        '김선균',
        '명재환',
        '양석우',
        '유근영',
        '유수혁',
        '윤성현',
        '장태양',
        '최기석',
    ];

    const [text, setText] = useState(' ');
    const [data, setData] = useState([]);
    const columns = [
        { property: 'name', header: <Text>이름</Text>, primary: true },
        { property: 'location', header: '장소' },
        { property: 'cost', header: '비용' },
    ];
    const [showTable, setShowTable] = useState(false);

    function handleChangeA({ target }) {
        setA(target.value);
    }

    function handleChangeB({ target }) {
        setB(target.value);
    }

    function toSave() {
        let cost = totalCost / checked.length;
        let arr = [];
        checked.map(d => {
            arr.push({
                name: d,
                location: location,
                cost: Math.round(cost),
            });
        });
        // let toString = arr.map(d => JSON.stringify(d) + '\n');
        // setText(toString);
        setShowTable(true);
        setData(arr);
    }

    function onCheckAll(event) {
        if (event.target.checked) {
            setChecked(members);
        } else {
            setChecked([]);
        }
    }

    function onCheck(event, value) {
        if (event.target.checked) {
            setChecked([...checked, value]);
        } else {
            setChecked(checked.filter(item => item !== value));
        }
    }

    return (
        <div>
            <Form>
                <FormField name="location" value={location} onChange={handleChangeA} label="장소" />
                <FormField
                    name="totalCost"
                    value={totalCost}
                    onChange={handleChangeB}
                    label="총금액"
                    type="number"
                />
                <Box
                    height="120px"
                    overflow="auto"
                    style={{
                        position: 'relative',
                        display: 'block',
                    }}
                >
                    <CheckBox
                        checked={checked.length === 8}
                        indeterminate={checked.length > 0 && checked.length < 8}
                        label="All"
                        onChange={onCheckAll}
                    />
                    {members.map(item => (
                        <CheckBox
                            key={item}
                            checked={checked.indexOf(item) !== -1}
                            label={item}
                            onChange={e => onCheck(e, item)}
                        />
                    ))}
                </Box>
                <Box align="center" pad="large">
                    <Button hoverIndicator icon={<LinkDown />} onClick={toSave} />
                </Box>
            </Form>
            {/* <TextArea value={text} /> */}
            {showTable ? (
                <Box align="center" pad="large">
                    <DataTable columns={columns} data={data} step={10} />
                </Box>
            ) : (
                ''
            )}
        </div>
    );
}

export default CalcForm;
