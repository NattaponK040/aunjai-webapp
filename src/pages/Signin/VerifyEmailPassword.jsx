import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'app/pages/Signin/css/index.css';

class VerifyEmailPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types
      email: props.signInWithEmail,
      password: '',
    };
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={'paper'}>
          <Avatar className={'avatar'}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบอุ่นใจ
          </Typography>
          <div className={'form'}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email or Phone"
              label="Email or Phone"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              disabled={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />

            <Button type="submit" fullWidth variant="contained" color="primary" className={'submit'} onClick={() => {}}>
              เข้าใช้งาน
            </Button>
          </div>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

// const mapDispatchToProps =(state)=> {
//     console.log(state)
//     return {emailSignIn: state.emailSignIn}
// }

const mapStateToProps = (state) => {
  console.log(state.signInWithEmail);
  return { signInWithEmail: state.signInWithEmail };
};

export default connect(mapStateToProps)(VerifyEmailPassword);
