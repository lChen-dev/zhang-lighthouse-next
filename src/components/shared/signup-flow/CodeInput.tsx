/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import { KEY_BACK_SPACE } from 'keycode-js';

interface Props {
  onComplete?: (code: string) => void;
  errorMessage: string;
  setErrorMessage: (err: string) => void;
}

const CodeInput: React.FC<Props> = ({ onComplete, errorMessage, setErrorMessage }: Props) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputs = [useRef<HTMLInputElement>(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (!verificationCode.includes('') && onComplete && errorMessage.length === 0)
      onComplete(verificationCode.join(''));
  }, [verificationCode, errorMessage, onComplete]);

  const updateVerificationCode = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    const newVerificationCode = verificationCode.slice();
    const { value } = event.target;
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    if (index < 5 && value && event.target.nextSibling) {
      (event.target.nextSibling as HTMLInputElement).focus();
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // If backspace is pressed, autofocus on the previous input
    const target = event.target as HTMLInputElement;
    if (event.keyCode === KEY_BACK_SPACE && target.previousSibling) {
      const id = parseInt(target.getAttribute('data-index') ?? '', 10);
      const currentVerificationCode = verificationCode;
      currentVerificationCode[id - 1] = '';
      setVerificationCode(currentVerificationCode);
      (target.previousSibling as HTMLInputElement).focus();
      (target.previousSibling as HTMLInputElement).value = '';
    }
  };

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardText = event.clipboardData.getData('Text');
    const newVerificationCode = clipboardText.split('').slice(0, 6);
    setVerificationCode(newVerificationCode);
    inputs[5].current?.focus();
  };

  return (
    <div className="o-verification-code-container">
      {verificationCode.map((number, index) => {
        return (
          <input
            onPaste={onPaste}
            data-index={index}
            className="o-verification-code__input"
            key={`verification-code-${index * 3}`}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            autoFocus={index === 0}
            value={number}
            maxLength={1}
            onChange={(e) => updateVerificationCode(index, e)}
            onKeyUp={onKeyUp}
            ref={inputs[index]}
            autoComplete="on"
          />
        );
      })}
    </div>
  );
};

export default CodeInput;
