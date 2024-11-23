import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetFlag } from 'redux/actions/voucher';

function Notification(props) {
  const dispatch = useDispatch()
  const { type, message,navigation } = props;
  const navigate = useNavigate()
  useEffect(() => {
    switch (type) {
      case 'success':
        toast.success(message, {
            onClose: () => {
                if(navigation === 'login'){
                    navigate('/login');
                }
                if(navigation === 'home'){
                    navigate('/home');
                }
                if(navigation === 'onboarding'){
                  navigate('/onboarding')
                }
            }
        });
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        toast.info(message);
        break;
       
    }
    // dispatch(resetFlag())
  }, [type, message]);


  return (
    <>
      <ToastContainer autoClose={500} />
    </>
  );
}

export default Notification;