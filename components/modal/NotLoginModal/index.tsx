import Icon from '@comps/Icon';
import useAuth from 'hooks/useAuth';
import Modal from '..';

const NotLoginModal = ({ open, handleOpen }: any) => {
  const { handleLogin } = useAuth();
  return (
    <>
      <Modal title={'Login'} open={open} handleOpen={handleOpen} size="half">
        <div className="flex flex-col items-center">
          <div>You are not login</div>
          <button
            className="btn btn-primary my-4"
            onClick={() => {
              handleLogin();
            }}
          >
            <span className="mr-2">Login with google</span>

            <Icon name="color-google" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NotLoginModal;
