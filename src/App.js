import React, { useState } from 'react';
import { Box, Button, Collapsible, Heading, Grommet, Layer, ResponsiveContext } from 'grommet';
import { FormClose, Calculator } from 'grommet-icons';
import CalcForm from './CalcForm';
import TagMember from './TagMember.js';

const theme = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Jua',
            size: '20px',
            height: '20px',
        },
    },
};

const AppBar = props => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="brand"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        elevation="medium"
        style={{ zIndex: '1' }}
        {...props}
    />
);

// const members = ['김선균','명재환','양석우','유근영','유수혁','윤성현','장태양','최기석'];

function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [members, setMembers] =  useState([]);
    const memberUpdate = (v) => setMembers(v);

    return (
        <Grommet theme={theme} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box>
                        <AppBar>
                            <Heading level="2" margin="none">
                                회식비 계산
                            </Heading>
                            <Button
                                icon={<Calculator />}
                                onClick={() => setShowSidebar(!showSidebar)}
                            />
                        </AppBar>
                        <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                            <Box flex align="center" justify="center">
                                <TagMember members={members} memberUpdate={memberUpdate}/>
                                <CalcForm members={members}/>
                            </Box>
                            {!showSidebar || size !== 'small' ? (
                                <Collapsible direction="horizontal" open={showSidebar}>
                                    <Box
                                        flex
                                        width="medium"
                                        background="light-2"
                                        elevation="small"
                                        align="center"
                                        justify="center"
                                    >
                                        sidebar1
                                    </Box>
                                </Collapsible>
                            ) : (
                                <Layer>
                                    <Box
                                        background="light-2"
                                        tag="header"
                                        justify="end"
                                        align="center"
                                        direction="row"
                                    >
                                        <Button
                                            icon={<FormClose size="large" />}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box fill background="light-2" align="center" justify="center">
                                        sidebar2
                                    </Box>
                                </Layer>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
