import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GoogleIcon from '@mui/icons-material/Google';
import barrio from '../assets/img/Barrio_seg.png';
//import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe0b2', 
    },
  },
});

//de prueba este admin
const adminCredentials = {
  username: 'admin',
  password: 'admin123',
};
//

export default function SignInSide() {

  ///funcionamiento del login
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Iniciar sesión exitosa, redirigir a la página de Crear Horarios
      navigate("/administrar-usuarios");
    } else {
      // Error de inicio de sesión, mostrar mensaje de acceso denegado
      setError(true);
    }
  };
  ///

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#093170' }}>
      <CssBaseline />

        <Grid className='contenedor1' item xs={6} sm={4} md={7} align='center'>
          <img src={barrio} alt="Logo" 
            style={{ width: '100%', maxWidth: '290px', marginTop: '80px', marginBottom:'20px', display: 'block' }}/>
          <Typography variant="h4" align="center" paragraph style={{ color: 'white', margin:'30px' }}> Bienvenido a la Plataforma </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" style={{ borderRadius:'100px' }} 
              component={RouterLink} 
              to="https://www.facebook.com/"
              target="_blank"> <FacebookIcon /> </Button>
              <Button variant="contained" color="primary" style={{ marginBottom: '10px', margin:'20px', borderRadius:'100px' }}
              component={RouterLink} 
              to="https://www.instagram.com/"
              target="_blank"> <InstagramIcon /> </Button>
              <Button variant="contained" color="primary" style={{ borderRadius:'100px' }}
              component={RouterLink} 
              to="https://www.google.com/"
              target="_blank"> <GoogleIcon /> </Button>
            </div>
        </Grid>
          
        <Grid className='contenedor2' item xs={5} sm={8} md={5} >
          <Box component={Paper} elevation={16}
            sx={{
              my: 10,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '90px', 
              paddingBottom:'90px',
              paddingLeft: '40px',
              paddingRight: '40px',
              backgroundColor: '#3d6bb3'
            }}>
            <Typography component="h1" variant="h4" color={'white'}> Ingreso </Typography>
            <Box component="form" noValidate  sx={{ mt: 2 }}>
              <Grid container>
                <label style={{color:'white'}}><b>Usuario</b></label>

                <TextField margin="normal" variant='filled' required fullWidth id="usuario" label="Usuario" name="usuario" autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
                <Link href="#" variant="body2"> Olvidaste tu usuario? </Link>

                <TextField margin="normal" variant='outlined' required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                <Link href="#" variant="body2"> olvidaste tu password? </Link>
              </Grid>
            
              <Grid container>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
              </Grid>
              
              {error && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                  Nombre de usuario o contraseña incorrectos.
                </Typography>
              )}

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ borderRadius:'80px' }} 
              onClick={handleLogin}
              > 
              <b>LOGIN</b> 
              </Button>

              
                            
              <Grid container>
                <Grid item xs> </Grid>
                <Grid item>
                  <Link href="#" variant="body2"> {"Don't have an account? Sign Up"} </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
