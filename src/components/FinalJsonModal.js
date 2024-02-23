
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useFormValues } from '../context/FormContext';
import { TextareaAutosize } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FinalJsonModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { generateFinalJson } = useFormValues();
  const finalJson = generateFinalJson();
  const handleSubmit = () => {
    handleOpen();
    console.log('Final JSON:', finalJson);
  };

  // reset the formValues to its default values
  const handleCancel = () => {
    window.location.reload()
  };
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ mr: 2 }}>Cancel</Button>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Final JSON
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextareaAutosize
              id="modal-modal-description"
              value={JSON.stringify(finalJson)}
              minRows={10}
              style={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}