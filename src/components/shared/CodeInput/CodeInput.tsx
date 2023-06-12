import { useEffect, useState, useRef } from 'react';
import './styles.css';

export default function VerificationCode({
  onComplete,
  errorMessage,
  setErrorMessage,
  inputLength = 6,
  erroredInput = false,
}: {
  onComplete?: Function;
  errorMessage?: any;
  setErrorMessage?: Function;
  inputLength?: number;
  erroredInput?: boolean;
}) {
  const [verificationCode, setVerificationCode] = useState(
    Array(inputLength)
      .fill('')
      .map((e) => e)
  );
  const inputs = Array(inputLength)
    .fill(null)
    .map((e) => useRef(null));

  useEffect(() => {
    // prevent trigger on each input with length 6
    if (
      verificationCode.filter((e) => e && e.trim() !== '').length === inputLength &&
      verificationCode.includes('') === false &&
      onComplete
    ) {
      if (errorMessage && errorMessage.length > 0) {
        return;
      }
      onComplete(verificationCode.join(''));
    }
  }, [verificationCode, errorMessage]);
  const updateVerificationCode = (index: any, event: any) => {
    setErrorMessage && setErrorMessage('');
    const newVerificationCode = verificationCode.slice();
    let { value } = event.target;
    value = value.trim();

    // If the value is more than one character, that means an autofill has occurred,
    // so we treat it as a "paste"
    if (value.length > 1) {
      // if manually type in existing filled input
      if (value != '' && value.length == 2) {
        let oldValue = verificationCode[index];
        value = value.replace(oldValue, '').trim();
        verificationCode[index] = value;
        setVerificationCode(verificationCode);
        if (index < 5 && value && event.target.nextSibling) {
          event.target.nextSibling.focus();
          event.target.nextSibling.select();
        }
      } else {
        setVerificationCode(
          value
            .padEnd(inputLength)
            .split('')
            .map((e: any) => e.trim())
        );

        // Set the focused input to the tail end of what was pasted
        const tail = value.length >= inputLength ? inputLength - 1 : value.length;
        (inputs[tail] as any).focus();
        (inputs[tail] as any).select();
      }
    } else if (value.length === 1) {
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
      if (index < 5 && value && event.target.nextSibling) {
        event.target.nextSibling.focus();
        event.target.nextSibling.select();
      }
    }
  };

  const onKeyUp = (event: any) => {
    // If backspace is pressed, autofocus on the previous input
    if (event.keyCode === 8) {
      const id = parseInt(event.target.id, 10);
      const currentVerificationCode = [...verificationCode];
      if (event.target.value.trim() !== '') {
        event.target.value = '';
        currentVerificationCode[id] = '';
        setVerificationCode(currentVerificationCode);
        event.target.focus();
        event.target.select();
        return;
      }

      if (id === inputLength - 1) {
        currentVerificationCode[id] = '';
      }
      currentVerificationCode[id - 1] = '';
      setVerificationCode(currentVerificationCode);
      if (event.target.previousSibling) {
        event.target.previousSibling.focus();
        event.target.previousSibling.select();
        event.target.previousSibling.value = '';
      }
    }
  };

  const onPaste = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const clipboardData = event.clipboardData.getData('Text');

    // Pad to 6 characters so that it renders 6 input boxes
    const clipboardText = clipboardData.padEnd(inputLength);
    const newVerificationCode = clipboardText.split('').slice(0, inputLength);
    setVerificationCode(newVerificationCode);

    // Set the focused input to the tail end of what was pasted
    const tail = clipboardData.length >= inputLength ? inputLength - 1 : clipboardData.length;
    (inputs[tail] as any).focus();
    (inputs[tail] as any).select();
  };

  return (
    <div className="o-verification-code-container">
      {verificationCode.map((number, index) => {
        return (
          <input
            onPaste={onPaste}
            id={`${index}`}
            className={
              window.location.pathname.includes('user-onboarding')
                ? 'o-verification-code__input'
                : 'o-verification-code__input-inmodal'
            }
            style={erroredInput ? { border: '1px solid #F65151' } : {}}
            key={`verification-code-${index}`}
            type="tel"
            pattern="[0-9]*"
            onClick={(event: any) => event.target.select() && event.target.focus()}
            value={number}
            maxLength={6}
            onChange={(e) => updateVerificationCode(index, e)}
            onKeyUp={onKeyUp}
            ref={(input: any) => (inputs[index] = input)}
            autoComplete="on"
          />
        );
      })}
    </div>
  );
}
