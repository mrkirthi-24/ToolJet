import React, { useState, useEffect } from 'react';
import { ButtonSolid } from '../_components/AppButton';
import { authenticationService } from '@/_services';
import { toast } from 'react-hot-toast';

export const SignupInfoScreen = function SignupInfoScreen({ email, backtoSignup, name }) {
  const [resendBtn, setResetBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const single_organization = window.public_config?.DISABLE_MULTI_WORKSPACE === 'true';
  const darkMode = localStorage.getItem('darkMode') === 'true';

  useEffect(() => {
    let timeLeft = 30;
    let elem = document.getElementById('resend');

    let timerId = resendBtn && setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        setResetBtn(false);
        elem.innerHTML = 'Resend verification mail ';
      } else {
        elem.innerHTML = 'Resend verification mail in ' + timeLeft + ' s';
        timeLeft--;
      }
    }
  }, [resendBtn]);

  const resendInvite = (e) => {
    setIsLoading(true);

    e.preventDefault();
    authenticationService
      .resendInvite(email)
      .then(() => {
        setIsLoading(false);
        setResetBtn(true);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error('Something went wrong', {
          position: 'top-center',
        });
      });
  };

  return (
    <div className="info-screen-wrapper">
      <div className="signup-info-card">
        <img
          className="info-screen-email-img"
          src={
            darkMode
              ? 'assets/images/onboardingassets/Illustrations/verify email_dark.svg'
              : 'assets/images/onboardingassets/Illustrations/Verify email.svg'
          }
          alt="email image"
        />
        <h1 className="common-auth-section-header">Check your mail</h1>
        <p className="info-screen-description">
          We’ve sent an email to <span className="signup-email-name">{email} </span>with a verification link. Please use
          that to verify your email address.
        </p>
        <p className="info-screen-spam-msg">Did not receive an email? Check your spam folder</p>
        <div className="separator-onboarding">
          <div className="separator">
            <h2>
              <span>OR</span>
            </h2>
          </div>
        </div>

        <>
          <ButtonSolid
            variant="secondary"
            onClick={(e) => {
              resendInvite(e);
            }}
            id="resend"
            className="signup-info-resend-btn signup-info-btn"
            disabled={resendBtn || isLoading}
          >
            Resend verification mail in 30s
          </ButtonSolid>
          {!single_organization && (
            <ButtonSolid
              variant="tirtiary"
              type
              onClick={() => backtoSignup(email, name)}
              className="signup-info-edit-btn signup-info-btn"
            >
              Edit email address
            </ButtonSolid>
          )}
        </>
      </div>
    </div>
  );
};