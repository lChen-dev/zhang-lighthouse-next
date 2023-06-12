import React from 'react';

import { useErrors } from '@hooks/errors';

import './css/toast.css';
import Toast, { Position } from '@components/shared/Toast';

const RequestErrorAlert: React.FC = () => {
  const { errors, clearErrors } = useErrors();
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <Toast position={Position.TOP} bg="bg-red" className="text-white">
      <p className="text-white pr-6">Uh oh! An error occurred.</p>
      <button className="font-bold text-lg hover:cursor-pointer text-white" type="button" onClick={clearErrors}>
        &times;
      </button>
    </Toast>
  );
};

export default RequestErrorAlert;
