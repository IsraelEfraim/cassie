import React, { useState } from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, IconButton, Popover, Tooltip, Typography } from '@material-ui/core'
import { Gradient as Opacity } from '@material-ui/icons/'

import Slider from '../acquisition/Slider'

import { lerp, extractAlpha } from '../../../common/utils'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: 150,
    margin: theme.spacing(2, 3, 1)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}))

const OpacityControl = ({ opacity = 1, onOpacityChange = () => {} }) => {
  const classes = useStyles()
  const theme = useTheme() // @TODO verify

  const [state, setState] = useState({ open: false, anchorEl: null })
  const { open, anchorEl } = state

  const togglePopover = (event) => {
    setState({ open: !open, anchorEl: !open && event.currentTarget })
  }

  const opaque = extractAlpha(theme.palette.action.active)

  const transparency = {
    color: `rgba(0, 0, 0, ${lerp(0.1, opaque, opacity)})`
  }

  return (
    // @TODO i18n
    <span>
      <Tooltip title='Opacidade' placement='top'>
        <IconButton onClick={togglePopover}>
          <Opacity style={transparency} />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={togglePopover}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box display='flex' flexDirection='column' className={classes.wrapper}>
          <Slider
            value={opacity * 100}
            onChange={v => onOpacityChange(v / 100)}
          />
          <Typography className={classes.content} variant='body1' align='center'>
            {parseInt(opacity * 100, 10)}%
          </Typography>
        </Box>
      </Popover>
    </span>
  )
}

export default OpacityControl