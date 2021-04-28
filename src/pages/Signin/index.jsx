import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { LoginWithFacebook, loginWithGoogle } from 'app/api/authentication';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'app/pages/Signin/css/index.css';
import { withRouter } from 'react-router';
import { actionTypes } from 'app/store/actionType';
import { connect } from 'react-redux';

const validator = require('email-validator');

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    // const mapDispatchSentEmail = props.sentEmailToNextPage ||;
    this.state = {
      signInWithEmail: '',
      open: false,
      alertMsg: '',
      // eslint-disable-next-line react/prop-types
      setEmailNextPage: props.sentEmailToNextPage,
    };
  }

  render() {
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({
        open: false,
      });
    };
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.signInWithEmail}
              onChange={(event) => this.setState({ signInWithEmail: event.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={'submit'}
              onClick={() => {
                if (validator.validate(this.state.signInWithEmail)) {
                  console.log('next page');
                  // eslint-disable-next-line react/prop-types
                  this.props.sentEmailToNextPage(this.state.signInWithEmail);
                  console.log(this.props);
                  // eslint-disable-next-line react/prop-types
                  this.props.history.push('/user/verify/email');
                } else {
                  this.setState({
                    alertMsg: 'อีเมลของคุณไม่ถูกต้อง',
                    open: true,
                  });
                }
              }}
            >
              ถัดไป
            </Button>
            <Grid container>
              <Grid item xs={10}></Grid>
              <Grid item xs={2}>
                <Link href="/sign-up" variant="body2">
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
            <Grid>
              <Grid xs={12}>
                <Button variant="outlined" onClick={LoginWithFacebook} className={'social'}>
                  เข้าสู่ระบบด้วย Facebook
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button variant="outlined" onClick={loginWithGoogle} className={'social'}>
                  เข้าสู่ระบบด้วย Google
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={8}></Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={this.state.alertMsg}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { signInWithEmail: state.signInWithEmail };
};

const mapDispatchToProps = (dispatch) => ({
  sentEmailToNextPage: (value) => {
    return dispatch({ type: actionTypes.EMAIL_SIGNIN, signInWithEmail: value });
  },
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
