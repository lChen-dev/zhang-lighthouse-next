import { useRef, useState } from 'react';

function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default function TermsAndConditions({ display, setDisplay, setAcceptedTerms, acceptedTerms }) {
  const [reachedEnd, setReachedEnd] = useState(false);
  const termsRef = useRef(null);
  const checkScrollPosition = (contentWindow, e) => {
    const { offsetHeight } = e.target.body;
    const currentPosition = contentWindow.innerHeight + contentWindow.scrollY;
    if (currentPosition >= offsetHeight) {
      setReachedEnd(true);
    }
  };

  const closeModal = (e) => {
    setDisplay('none');
  };

  const toggleCheckbox = (e) => {
    if (e.target.checked) {
      setAcceptedTerms(true);
      closeModal();
    }
  };

  if (termsRef?.current) {
    const { contentWindow } = termsRef.current;
    termsRef.current.contentDocument.addEventListener(
      'scroll',
      debounce(checkScrollPosition.bind(this, contentWindow), 250),
    );
  }

  return (
    <div className="o-modal-screen" onClick={closeModal} style={{ display }}>
      <div className="o-modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Terms & Conditions</h2>
        <p>Please read and scroll to the bottom to proceed.</p>
        <iframe
          src="/static/assets/documents/LighthouseRentersTermsConditions.html"
          width="100%"
          frameBorder="none"
          onScroll={checkScrollPosition}
          ref={termsRef}
          style={{ overflowY: 'scroll' }}
          className="o-terms-container"
        />
        <div className="o-checkbox-container">
          <input
            type="checkbox"
            id="checkbox2"
            required
            disabled={reachedEnd !== true}
            onChange={toggleCheckbox}
            title="Please scroll to the bottom before checking this box"
            checked={acceptedTerms}
          />
          <label htmlFor="checkbox2" title="Please scroll to the bottom of the Terms and Conditions">
            I agree to the above Terms & Conditions and{' '}
            <a href="https://www.lighthouse.app/privacy" target="_blank">
              Privacy Policy
            </a>
          </label>
        </div>
      </div>
    </div>
  );
}
