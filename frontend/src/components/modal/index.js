import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import './modal.scss'

function MyModal(props) {
  const opts = {
    height: 'auto',
    width: 'auto',
    playerVars: {
        autoplay: 1,
      },
}
  return (
    <Modal
      {...props}
      size="xl"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
         <div className='modal-contain'>
            <YouTube videoId={props.videoId} opts={opts} />
         </div>
      </Modal.Body>
    </Modal>
  );
}

export default MyModal