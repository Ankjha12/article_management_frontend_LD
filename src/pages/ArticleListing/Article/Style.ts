// styles.ts
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    width: 270, // Set a fixed width
    height: 400, // Set a fixed height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: 10,
    margin: "10px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
},
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  title: {
    padding: '0 16px',
    marginTop: '10px',
  },
  content: {
    flexGrow: 1,
    padding: '0 16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  collapsed: {
    maxHeight: '60px', // Adjust as needed
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  expanded: {
    maxHeight: 'auto',
    // overflow: 'scroll',
    // overflowX: 'hidden'
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
