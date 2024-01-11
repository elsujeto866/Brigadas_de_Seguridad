import * as React from 'react';
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

export default function SignInSide() {

  /*const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleIrAOtraInterfaz = () => {
    // Cambia el estado open a true para cerrar la interfaz de SignInSide
    setOpen(true);
    // Realiza la redirección a ValidacionUsuarios
    navigate('/components/ValidacionUsuarios');
  };*/


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', backgroundColor: '#093170' }}>
      <CssBaseline />
        <Grid className='contenedor1' item xs={6} sm={4} md={7} align='center'>
          <img src={barrio} alt="Logo" 
            style={{ width: '100%', maxWidth: '290px', marginTop: '80px', marginBottom:'20px', display: 'block' }}/>
          <Typography variant="h4" align="center" paragraph style={{ color: 'white', margin:'30px' }}> Bienvenido a la Plataforma </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" style={{ borderRadius:'100px' }}> <FacebookIcon /> </Button>
              <Button variant="contained" color="primary" style={{ marginBottom: '10px', margin:'20px', borderRadius:'100px' }}> <InstagramIcon /> </Button>
              <Button variant="contained" color="primary" style={{ borderRadius:'100px' }}> <GoogleIcon /> </Button>
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
                <TextField margin="normal" variant='filled' required fullWidth id="usuario" label="Usuario" name="usuario" autoFocus />
                <Link href="#" variant="body2"> Olvidaste tu usuario? </Link>

                <TextField margin="normal" variant='outlined' required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                <Link href="#" variant="body2"> olvidaste tu password? </Link>
              </Grid>
            
              <Grid container>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
              </Grid>
              
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} style={{ borderRadius:'80px' }} > <b>LOGIN</b> 
              
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
