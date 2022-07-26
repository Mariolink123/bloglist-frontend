import { useSelector } from 'react-redux'
import { Alert, Fade } from '@mui/material'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const shown = notification.message === '' ? false : true


  /*if (notification === null || notification.message === '') {
    return null
  }*/

  //const severity = notification.type

  const severity = notification.type === '' ? 'info' : notification.type

  const style = {
    marginBottom: 5,
  }

  return (
    <div style = {style} className="notification">
      <Fade in={shown} >
        {(notification &&
    <Alert severity={severity}>
      {notification.message}
    </Alert>
        )}
      </Fade>
    </div>
  )
}

export default Notification
