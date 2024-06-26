import { Link } from 'react-router-dom';
import { Typography, Container, Button } from '@material-ui/core';

const NotFound = () => (
  <Container style={{ textAlign: 'center', marginTop: '50px' }}>
    <Typography variant="h2" component="h1" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" component="h2" gutterBottom>
      Page Not Found
    </Typography>
    <Typography variant="body1" gutterBottom>
      The page you are looking for might have been removed or is temporarily unavailable.
    </Typography>
    <Button component={Link} to="/login" variant="contained" color="primary">
      Go to Login
    </Button>
  </Container>
);

export default NotFound;
