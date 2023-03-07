import { useState } from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CardHeader, Switch, FormGroup, FormControlLabel, CssBaseline} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark"
  },
};

function DarkMode() {
  const [isDarkTheme, setIsdarkTheme] = useState(false);

  const changeTheme = () => {
    setIsdarkTheme(!isDarkTheme);
  }

  return (
    <>
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline/>
        <CardHeader
        action={
          <FormGroup>
            <FormControlLabel 
            control={
              <Switch 
              checked={isDarkTheme} 
              onChange={changeTheme} 
              color="default" 
              />
            }
            label={ isDarkTheme ? <WbSunnyIcon/> :  <DarkModeIcon/> }
            />
          </FormGroup>
        }
        />
      </ThemeProvider>
  </>
  );
}

export default DarkMode;