// import {TextField} from '@mui/material';
// import CategoryContext from './CategoryContext';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useContext} from 'react';
import ListingContext from './ListingContext';
import Divider from '@mui/material/Divider';

/**
 *
 * @return {x}
 */
function ListViewer() {
  const {popupData, setPopupData} = useContext(ListingContext);
  const {imageNo, setImage} = useContext(ListingContext);
  const {rowState} = useContext(ListingContext);
  // console.log(setRowState);
  // console.log('popup');
  // console.log(popupData);
  const shiftImageLeft = (length) => {
    if (imageNo === 0) {
      setImage(length - 1);
    } else {
      setImage(imageNo - 1);
    }
  };

  const shiftImageRight = (length) => {
    if (imageNo === length - 1) {
      setImage(0);
    } else {
      setImage(imageNo + 1);
    }
  };

  return (
    <Dialog fullScreen style={{borderStyle: 'solid', borderColor: 'lightgrey',
      borderWidth: '8px'}}
    open={popupData !== undefined}>
      <Box sx={{display: 'grid'}}>
        <img
          src={popupData[0].listings.images[imageNo].link}
          style={{width: '100%'}}
          alt={popupData[0].listings.title}
        ></img>
        {popupData[0].listings.images.length > 1 &&
            <div style={{textAlign: 'center', marginTop: '10px'}} sx={{m: 0.5}}>
              <IconButton onClick={() => shiftImageLeft(
                popupData[0].listings.images.length)}
              key='leftButton'
              title='leftButton'
              style={{minWidth: '7px', width: '35px',
                backgroundColor: 'black', marginRight: '5px',
                borderRadius: '50%', opacity: '0.5', color: 'white'}}>
                <ArrowBackIcon />
              </IconButton>
              {rowState}
              <IconButton onClick={() => shiftImageRight(
                popupData[0].listings.images.length)}
              key='rightButton'
              title='rightButton'
              style={{minWidth: '7px', width: '35px',
                backgroundColor: 'black',
                borderRadius: '50%', opacity: '0.5', color: 'white'}}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
        }
        <div style={{height: 'auto', fontSize: '20pt',
          marginLeft: '15px', marginTop: '5px'}}
        >{popupData[0].listings.title}</div>
        <div style={{height: 'auto', fontSize: '20pt',
          marginLeft: '15px'}}
        >{popupData[0].listings.content}</div>
        <div style={{height: 'auto', fontSize: '13pt',
          marginLeft: '15px'}}
        >{popupData[0].listings.price}</div>
        <Button style={{backgroundColor: 'lightblue', marginLeft: '20px',
          marginRight: '20px', marginTop: '10px', marginBottom: '5px'}}>
              Reply to poster
        </Button>
        <Divider style={{marginTop: '10px', marginBottom: '10px'}}
          variant='middle'/>
        <div style={{height: 'auto', fontSize: '15pt',
          marginLeft: '15px', paddingBottom: '15px'}}
        >{popupData[0].listings.summary}</div>
      </Box>
      <IconButton sx={{marginLeft: 'auto'}} onClick={
        ()=> {
          setImage(0); setPopupData(false);
        }}
      style={{right: '10px', top: '10px', position: 'fixed',
        color: 'white', backgroundColor: alpha('#000', 0.5)}}
      title="closeButton"
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default ListViewer;

// Sources
// https://mui.com/api/divider/
// https://mui.com/api/dialog/
