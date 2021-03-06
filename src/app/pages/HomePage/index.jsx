import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useTranslation } from 'react-i18next'

import { Actions as AuthActions } from '../../../store/ducks/auth'
import { Actions as LangActions } from '../../../store/ducks/i18n'

import { Avatar, Box, Button, Grid, Typography } from '@material-ui/core'

import LogoIcon from '@material-ui/icons/Language'
import { makeStyles } from '@material-ui/core/styles'
import googleLogo from '../../../resources/googleLogo.svg'
import googleLogoDisabled from '../../../resources/googleLogoDisabled.svg'

import pt from '../../../resources/i18n/pt.svg'
import en from '../../../resources/i18n/en.svg'

const useStyles = makeStyles(theme => ({
  backdrop: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    zIndex: '-1',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.primary.light,
  },
  heading: {
    padding: '60px 0px',
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    padding: '60px 0px',
  },
  logo: {
    fontSize: 120,
    color: 'white',
    margin: '0px 0px 20px 0px',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '7rem',
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    backgroundColor: theme.palette.primary[200],
    padding: '40px 48px',
  },
  i18nSwitchers: {
    borderRadius: '5px',
    backgroundColor: '#74c7be',
  },
  i18nSwitch: {
    padding: '5px 10px',
    margin: '0 10px',
  },
  flag: {
    marginRight: '5px',
    height: '25px',
    width: '25px'
  },
  description: {
    margin: '30px 0px 40px 0px',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  google: {
    margin: '-4px 20px -4px -15px',
  }
}))

const HomePage = () => {
  const busy = useSelector(state => state.auth.authenticating)

  const dispatch = useDispatch()
  const [t] = useTranslation()
  const classes = useStyles()

  useEffect(() => {
    dispatch(AuthActions.loadClientAuth())
  }, [])

  const handleLanguageChange = (local) => {
    dispatch(LangActions.setLang(local))
  }

  return (
    <Box>
      <Box className={classes.backdrop} />
      <Box className={classes.heading} display='flex' flexDirection='column' alignItems='center'>
        <LogoIcon className={classes.logo} />
        <Typography className={classes.title} variant='h1'>
          C.A.S.S.I.E.
        </Typography>
        <Typography className={classes.subtitle} variant='h5'>
          Coastal Analysis System via Satellite Imagery Engine
        </Typography>
      </Box>
      <Grid container className={classes.content} justify='center' spacing={0}>
        <Grid item className={classes.wrapper} xs={10} md={6}>
          <Box className={classes.i18nSwitchers}>
            <Button className={classes.i18nSwitch} onClick={() => handleLanguageChange('pt-BR')}>
              <Avatar alt='' src={pt} className={classes.flag} />
              pt-BR
            </Button>
            <Button className={classes.i18nSwitch} onClick={() => handleLanguageChange('en-US')}>
              <Avatar className={classes.flag} alt='' src={en} />
              en-US
            </Button>
          </Box>
          <Typography className={classes.description} variant='body1' align='center' >
            {t('self.abstract')}
          </Typography>
          <Button
            disabled={busy} variant='contained' size='large'
            onClick={() => dispatch(AuthActions.begin(() => dispatch(push('/main/acquisition'))))}
          >
            <Avatar className={classes.google} variant='square'
              alt='Google Logo' src={busy ? googleLogoDisabled : googleLogo} 
            />
            {t('auth.signin')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage