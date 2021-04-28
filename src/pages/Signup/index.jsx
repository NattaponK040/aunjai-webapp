import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import { CardContent, Fab, FormControl, FormLabel, RadioGroup } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { callRegisterAccountAPI } from 'app/api/register-api';
import { getAccessUserDetail } from 'app/api/setReqestData';
import 'app/pages/Signup/css/index.css';

const template = require('app/resourse/template');
const validator = require('email-validator');
const bcrypt = require('bcryptjs');

class SignupAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      receiveNews: true,
      gender: 0,
      email: '',
      password: '',
      confirmPassword: '',
      errCFPassword: false,
      selectedDate: new Date('2021-04-18T21:11:54'),
      profileImg: '',
      validateForm: {
        validateName: false,
        validateEmail: false,
        validatePassword: false,
      },
    };
  }

  render() {
    const handleDateChange = (date) => {
      this.setState({ selectedDate: date });
    };

    const handleUploadAvatar = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function () {
        this.setState({ profileImg: reader.result });
      }.bind(this);
    };

    const onSubmit = () => {
      this.setState({
        validateForm: {
          validatePassword: !(this.state.password != '' && this.state.confirmPassword != ''),
          validateEmail: !validator.validate(this.state.email),
          validateName: !(name !== '' && name.length !== 0),
        },
      });

      if (
        (this.state.validateForm.validateName == this.state.validateForm.validateEmail) ==
        !this.state.validateForm.validatePassword
      ) {
        const profile = template;
        profile.profile.accessDevice = getAccessUserDetail();
        // profile.profile.picture = profileImg;
        profile.profile.name = this.state.fullName;
        profile.profile.email = this.state.email;
        profile.profile.gender = this.state.gender;
        profile.profile.age = new Date().getFullYear() - this.state.selectedDate.getFullYear();
        profile.profile.news = this.state.receiveNews;
        (async () => {
          profile.profile.password = await bcrypt.hashSync(this.state.password, bcrypt.genSaltSync());
          await callRegisterAccountAPI(profile);
        })();
      }
    };
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={'paper'}>
          <Avatar className={'avatar'}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {/*<Badge*/}
          {/*    overlap="circle"*/}
          {/*    anchorOrigin={{*/}
          {/*        vertical: 'bottom',*/}
          {/*        horizontal: 'right',*/}
          {/*    }}*/}
          {/*    badgeContent={*/}
          {/*        <input*/}
          {/*            accept="image/*"*/}
          {/*            className={classes.input}*/}
          {/*            id="contained-button-file"*/}
          {/*            multiple*/}
          {/*            type="file"*/}
          {/*            onChange={handleUploadAvatar}*/}
          {/*        />*/}
          {/*        }*/}
          {/*>*/}

          {/*</Badge>*/}
          <div className={'form'}>
            <Grid item spacing={1}>
              <CardContent>
                <Grid container justify="center" alignItems="center">
                  <input
                    accept="image/*"
                    className={'input'}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUploadAvatar}
                  />
                  <label htmlFor="contained-button-file">
                    <Fab component="span" className={'button'}>
                      <Avatar
                        alt="Remy Sharp"
                        src={this.state.profileImg}
                        style={{ width: '100px', height: '100px' }}
                        onClick={console.log('xx')}
                      />
                    </Fab>
                  </label>
                </Grid>
              </CardContent>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="ชื่อ"
                  autoFocus
                  value={this.state.fullName}
                  error={this.state.validateForm.validateName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
              </Grid>
              <Grid container spacing={4}>
                {/* eslint-disable-next-line react/jsx-no-duplicate-props */}
                <Grid item xs={12} xs={8}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">เพศ</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                      <FormControlLabel
                        value="1"
                        control={
                          <Radio
                            color="primary"
                            checked={this.state.gender === 1}
                            onClick={() => this.setState({ gender: 1 })}
                          />
                        }
                        label="ชาย"
                      />
                      <FormControlLabel
                        value="2"
                        control={
                          <Radio
                            color="primary"
                            checked={this.state.gender === 2}
                            onClick={() => this.setState({ gender: 2 })}
                          />
                        }
                        label="หญิง"
                      />
                      <FormControlLabel
                        value="0"
                        control={
                          <Radio
                            color="primary"
                            checked={this.state.gender === 0}
                            onClick={() => this.setState({ gender: 0 })}
                          />
                        }
                        label="ไม่ระบุ"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} variant="outlined">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} variant="outlined">
                    <Grid container justify="space-around" variant="outlined" className={'formControl'}>
                      <KeyboardDatePicker
                        required
                        fullWidth
                        margin="normal"
                        views={['year']}
                        label="ปีเกิด"
                        format="yyyy"
                        value={this.state.selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  error={this.state.validateForm.validateEmail}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="text"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  error={this.state.validateForm.validatePassword}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Password"
                  type="text"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.confirmPassword}
                  error={this.state.errCFPassword || this.state.validateForm.validatePassword}
                  onChange={(e) => {
                    this.setState({ confirmPassword: e.target.value });
                  }}
                  onKeyUp={() => {
                    if (
                      this.state.password === this.state.confirmPassword &&
                      this.state.password.length == this.state.confirmPassword.length
                    ) {
                      this.setState({ errCFPassword: false });
                      return;
                    } else {
                      if (this.state.password !== this.state.confirmPassword) {
                        this.setState({ errCFPassword: true });
                      } else {
                        this.setState({ errCFPassword: false });
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={this.state.receiveNews}
                      color="primary"
                      onChange={() => {
                        this.setState({ receiveNews: !this.state.receiveNews });
                      }}
                      checked={this.state.receiveNews}
                    />
                  }
                  label="ฉันอยากรับข่าวสารของอุ่นใจทาง email"
                />
              </Grid>
            </Grid>
            <Button type="button" fullWidth variant="contained" color="primary" className={'submit'} onClick={onSubmit}>
              สมัครสมาชิกอุ่นใจ
            </Button>
            {/*<Grid container justify="flex-end">*/}
            {/*    <Grid item>Already have an account?*/}
            {/*        <Link href="#" variant="body2">*/}
            {/*            Sign in*/}
            {/*        </Link>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
          </div>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}

export default SignupAccount;
