import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, Text, DataTable } from 'grommet';
import { Table, TableAdd } from 'grommet-icons';

function CalcForm({members}) {
    const [location, setA] = useState('');
    const [totalCost, setB] = useState(0);
    const [checked, setChecked] = useState([]);
    // const members = memberList;
    // [
    //     '김선균',
    //     '명재환',
    //     '양석우',
    //     '유근영',
    //     '유수혁',
    //     '윤성현',
    //     '장태양',
    //     '최기석',
    // ];

    const [data, setData] = useState([]);
    const columns = [
        { property: 'name', header: <Text>이름</Text>, primary: true },
        { property: 'location', header: '장소' },
        { property: 'cost', header: '비용' },
    ];
    const [showTable, setShowTable] = useState(false);
    const [showNotice, setNotice] = useState(false);
    const [notiText, setNotiText] = useState('');

    function handleChangeA({ target }) {
        setA(target.value);
    }

    function handleChangeB({ target }) {
        setB(target.value);
    }

    function toShow() {
        if (checked.length === 0) {
            toNoti();
            setShowTable(false);
            setNotice(true);
        } else {
            toSave();
            setShowTable(true);
            setNotice(false);
        }
    }

    function toSave() {
        let cost = totalCost / checked.length;
        let arr = [];
        checked.forEach(d => {
            arr.push({
                name: d,
                location: location,
                cost: Math.round(cost),
            });
        });
        setData(arr);
    }

    function toNoti() {
        let text = '참석자를 선택해주세요.\n';
        if (location === '') {
            text += '장소를 미입력했습니다.\n'
        }
        if (totalCost === 0) {
            text += '금액을 미입력했습니다.\n'
        }
        setNotiText(text);
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
                        checked={checked.length > 0}
                        //indeterminate={checked.length > 0 && checked.length < 8}
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
                <Box align="center" pad="large" direction="row" gap="small">
                    <Button icon={<TableAdd />} plain={false} />
                    <Button primary icon={<Table />} plain={false} onClick={toShow} />
                </Box>
            </Form>
            {showTable ? (
                <Box align="center" pad="large">
                    <DataTable columns={columns} data={data} step={10} />
                </Box>
            ) : (
                ''
            )}
            {showNotice ? (
                <Box align="center" pad="large">
                    {notiText.split('\n').map(line => {
                        return (<span>{line}</span>);
                    })}
                </Box>
            ) : (
                ''
            )}
        </div>
    );
}

export default CalcForm;
