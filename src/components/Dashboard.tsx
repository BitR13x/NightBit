/* import Posts from './posts/Posts';
import Navigation from './Navigation'
 */
import { Container, Button, Stack, Divider } from '@mui/material';

const Dashboard = () => {
  return (
    <div id="page-container">

        <div>
          <Container className="giveMeSmallSpace">
            <Stack direction="row" spacing={2}
            divider={<Divider orientation="vertical" flexItem />} 
            alignItems="center" justifyContent="center">
              <Button sx={{ maxWidth: 325, width: "100%" }} variant="contained" href='/login'>log in</Button>
              <Button sx={{ maxWidth: 325, width: "100%" }} variant="contained" href='/signup'>Sign up</Button>
            </Stack>
          </Container>
        </div>

{/*       <Navigation />
      <Posts />  */}
    </div>
  )
}

  export default Dashboard;

