import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import LoginModal from '../elements/LoginModal'
import HeroAuth from '../sections/HeroAuth'
import Testimonial from './Testimonial';
import axios from 'axios';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [formModalActive, setFormModalActive] = useState(false)
  const [auth,setAuth] = useState(false)
  const [user, setUser] = useState(null)

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const openFormModal = (e) => {
    console.log("inside form model")
    e.preventDefault();
    setFormModalActive(true);
  }

  const closeFormModal = (e) => {
    console.log("closing form in Hero...")
    e.preventDefault();
    setFormModalActive(false);
  } 

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const isAuthenticated = (e) => {
    e.preventDefault();
    setAuth(true)
    return true
  }

  const getAuthContents = () => {
    return <HeroAuth/>
  }

  const getNontAuthContents = () => {
    return 
  }

  const userAccount = (usr) => {
    console.log("set user in Hero...")
    console.log(usr)
    setUser(usr)
  }

  const handleRingBell = () => {
    console.log("Calling");

    axios.post('https://kmur5vdq9g.execute-api.us-west-2.amazonaws.com/test/feedme', {type: 'CALL'})
    .then((response) => {console.log(response);}, (error) => {console.log(error);});
    
    console.log("Done Calling");
  }

  const handleRefreshWater = () => {
    console.log("Water");

    axios.post('https://kmur5vdq9g.execute-api.us-west-2.amazonaws.com/test/feedme', {type: 'RELAY1'})
    .then((response) => {console.log(response);}, (error) => {console.log(error);});
    
    console.log("Done Water");
  }

  const handleFeedAnimals = () => {
    console.log("Feeding");
    
    axios.post('https://kmur5vdq9g.execute-api.us-west-2.amazonaws.com/test/feedme', {type: 'FEED'})
    .then((response) => {console.log(response);}, (error) => {console.log(error);});
    
    console.log("Done Feeding");
  }

  return (
    <>
    
    <section
      {...props}
      className={outerClasses}
    >

      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Feed Farm Animals... <span className="text-color-primary">LIVE!</span>
            </h1>
            <div className="container-xs">
              {user && <p>Hi {user.attributes.name}, you have <span className="text-color-primary">0 tokens</span> to use.</p>}
              {!user &&
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Discover the unique experience of live feeding from your device. The animals are hungry and ready for you to FEED them.
                </p>}
                {!user && <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button onClick={openFormModal} tag="a" color="primary" wideMobile >
                    Start Feeding Now
                    </Button>
                </ButtonGroup>
              </div>}
            </div>
          </div>
          <LoginModal
            id="signin-modal"
            show={formModalActive}
            handleClose={closeFormModal}
            customClose={closeFormModal}
            user={userAccount}
            />
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            
          <div className="responsive-video">
                
                  <iframe
                    title="video"
                    src="https://farmiothings.com:5443/WebRTCAppEE/play.html?name=SHFarm"
                    frameBorder="0"
                    allowFullScreen
                  >
                  </iframe>
          </div> 

          {user && <div style={{padding:25}}>
                    <ButtonGroup>
                      <Button tag="a" color="primary" wideMobile onClick={handleRingBell}>Ring Bell 1 token</Button>
                      <Button tag="a" color="primary" wideMobile onClick={handleRefreshWater}>Refresh Water 1 token</Button>
                      <Button tag="a" color="primary" wideMobile onClick={handleFeedAnimals}>Feed Animals 3 tokens</Button>
                    </ButtonGroup>
                  </div>}
            
            {/* <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/chicken.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a> */}
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
    </>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;