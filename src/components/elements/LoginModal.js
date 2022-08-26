import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonGroup from './ButtonGroup';
import Button from './Button';
import Input from './Input'
import SignInForm from './SignInForm';
import SignUpForm from './SingUpForm';
import { Auth } from 'aws-amplify'
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports'

Amplify.configure(aws_exports);

const propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  closeHidden: PropTypes.bool,
  video: PropTypes.string,
  videoTag: PropTypes.oneOf(['iframe', 'video'])
}

const defaultProps = {
  children: null,
  show: false,
  closeHidden: false,
  video: '',
  videoTag: 'iframe'
}

const LoginModal = ({
  className,
  children,
  handleClose,
  show,
  closeHidden,
  video,
  videoTag,
  ...props
}) => {

  // console.log("props from beginning...")
  // console.log(props.handleClose)

  const [formDisplayType, setFormDisplayType] = useState('login')

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', stopProgagation);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', stopProgagation);
    };    
  });

  useEffect(() => {
    handleBodyClass();
  }, [props.show]); 
  
  const handleBodyClass = () => {
    if (document.querySelectorAll('.modal.is-active').length) {
      document.body.classList.add('modal-is-active');
    } else {
      document.body.classList.remove('modal-is-active');
    }
  }

  const keyPress = (e) => {
    e.keyCode === 27 && handleClose(e);
  }

  const stopProgagation = (e) => {
    e.stopPropagation();
  }

  const classes = classNames(
    'modal',
    show && 'is-active',
    video && 'modal-video',
    className
  );

  const determineFormDisplayType = (type) => {
    console.log("updating form display type: "+type)
    setFormDisplayType(type)
  }

  const showForm = (e) => {
    console.log("after props")
    handleClose(e)
    e.preventDefault()
  }

  const closeForm = (e) => {
    props.customClose(e)
  }

  const userAccount = (usr) => {
    console.log("set user in LoginModal...")
    console.log(props)
    props.user(usr)
  }

  return (
    <>
      {show &&
        <div
          {...props}
          className={classes}
          onClick={handleClose}
        >
          <div className="modal-inner" onClick={stopProgagation}>
          <div className="modal-content">
            {formDisplayType === 'login' ? <SignInForm user={userAccount} closeForm={closeForm} formVisible={showForm} formType={determineFormDisplayType}/> : <SignUpForm user={userAccount} closeForm={closeForm} formVisible={showForm} formType={determineFormDisplayType}/>}
                  {/* <div>
                    <h2 className="mt-0 mb-16">Account Login</h2>
                    <form>
                      <Input id="name" type="text" label="" placeholder="email address"/>
                      <Input id="name" type="password" label="" placeholder="password"/>
                      <div style={{padding:25}}><Button color="primary">Submit</Button></div>
                    </form>
                  </div> */}
          </div>
            
              <>
                {!closeHidden &&
                  <button
                    className="modal-close"
                    aria-label="close"
                    onClick={handleClose}
                  ></button>
                }
                
                
              </>
            
            
          </div>
          
        </div>
        
      }
    </>
  )
}

LoginModal.propTypes = propTypes;
LoginModal.defaultProps = defaultProps;

export default LoginModal;