import React, { useState } from 'react';

import { Box, Button, Keyboard, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

const allSuggestions = ['김선균','명재환','양석우','유근영','유수혁','윤성현','장태양','최기석'];

const Tag = ({ children, onRemove, ...rest }) => {
    const tag = (
        <Box
            direction="row"
            align="center"
            background="brand"
            pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
            margin={{ vertical: 'xxsmall' }}
            round="medium"
            {...rest}
        >
            <Text size="xsmall" margin={{ right: 'xxsmall' }}>
                {children}
            </Text>
            {onRemove && <FormClose size="small" color="white" />}
        </Box>
    );

    if (onRemove) {
        return <Button onClick={onRemove}>{tag}</Button>;
    }
    return tag;
};

const TagInput = ({ value = [], onAdd, onChange, onRemove, ...rest }) => {
    const [currentTag, setCurrentTag] = React.useState('');
    const [box, setBox] = React.useState();
    const boxRef = React.useCallback(setBox, []);

    const updateCurrentTag = event => {
        setCurrentTag(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    const onAddTag = tag => {
        if (onAdd) {
            onAdd(tag);
        }
    };

    const onEnter = () => {
        if (currentTag.length) {
            onAddTag(currentTag);
            setCurrentTag('');
        }
    };

    const renderValue = () =>
        value.map((v, index) => (
            <Tag margin="xxsmall" key={`${v}${index + 0}`} onRemove={() => onRemove(v)}>
                {v}
            </Tag>
        ));

    return (
        <Keyboard onEnter={onEnter}>
            <Box
                direction="column"
                align="center"
                pad={{ horizontal: 'xsmall' }}
                ref={boxRef}
                wrap>
                <Box direction="row">
                    {value.length > 0 && renderValue()}
                </Box>                    
                <Box 
                    flex style={{ minWidth: '120px' }}
                    direction="row">
                    <TextInput
                        type="search"
                        plain
                        dropTarget={box}
                        {...rest}
                        onChange={updateCurrentTag}
                        value={currentTag}
                        onSelect={event => {
                            event.stopPropagation();
                            onAddTag(event.suggestion);
                        }}
                    />
                </Box>
            </Box>
        </Keyboard>
    );
};

const TagMember = ({members,memberUpdate}) => {
    const [selectedTags, setSelectedTags] = React.useState(members);
    const [suggestions, setSuggestions] = React.useState(allSuggestions);

    const onRemoveTag = tag => {
        const removeIndex = selectedTags.indexOf(tag);
        const newTags = [...selectedTags];
        if (removeIndex >= 0) {
            newTags.splice(removeIndex, 1);
        }
        setSelectedTags(newTags);
    };

    const onAddTag = tag => {
        if (selectedTags.indexOf(tag) == -1)
            setSelectedTags([...selectedTags, tag])
    };

    const onFilterSuggestion = value =>
        setSuggestions(
            allSuggestions.filter(
                suggestion => suggestion.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            ),
        );

    return (
                <TagInput
                    placeholder="참석자 추가"
                    suggestions={suggestions}
                    value={selectedTags}
                    onRemove={onRemoveTag}
                    onAdd={onAddTag}
                    onChange={({ target: { value } }) => onFilterSuggestion(value)}
                    memberUpdate={memberUpdate(selectedTags)}
                />
    );
};

export default TagMember;
