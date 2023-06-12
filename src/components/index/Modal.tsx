/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IModalProps {
  show?: boolean;
  hideHandler: () => void;
  children: any;
}

const Modal: React.FunctionComponent<IModalProps> = ({
  show = true,
  children,
  hideHandler,
}: IModalProps) => (
  <div className={`z-50 SearchPopup ${show ? 'visible' : 'invisible'}`}>
    <div className="z-50 fixed bottom-0 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" onClick={hideHandler}>
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <div className="bg-white rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all max-w-lg w-full p-6">
        <div>{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
