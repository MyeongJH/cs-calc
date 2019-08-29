import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Layer,
  ResponsiveContext
} from 'grommet';
import { FormClose, Calculator } from 'grommet-icons';
import CalcForm from './CalcForm';

const theme = {
  global: {
    colors: {
      brand: '#228BE6'
    },
    font: {
      family: 'Jua',
      size: '20px',
      height: '20px'
    }
  }
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

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
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
                <CalcForm />
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
                      icon={<FormClose />}
                      onClick={() => setShowSidebar(false)}
                    />
                  </Box>
                  <Box
                    fill
                    background="light-2"
                    align="center"
                    justify="center"
                  >
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
