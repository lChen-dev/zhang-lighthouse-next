export const WarningBar = ({ onClick = () => {}, message }: { onClick?: () => any; message: string }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex p-2 w-full border-0 outline-0 appearance-none font-circular flex-wrap justify-center content-center font-medium"
    style={{
      marginTop: '38px',
      background: 'rgba(255, 132, 63, 1)',
      borderRadius: '4px',
      height: '56px',
      fontSize: '16px',
      paddingTop: '18px',
      paddingBottom: '18px',
      paddingLeft: '18px',
      paddingRight: '18px',
      color: '#fff',
    }}
  >
    {message}
  </button>
);

export const SuccessBar = ({ onClick = () => {}, message }: { onClick?: () => any; message: string }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex p-2 w-full border-0 outline-0 appearance-none font-circular flex-wrap justify-center content-center font-medium"
    style={{
      marginTop: '38px',
      background: 'rgba(52, 150, 109, 0.1)',
      borderRadius: '4px',
      height: '56px',
      fontSize: '16px',
      paddingTop: '18px',
      paddingBottom: '18px',
      paddingLeft: '18px',
      paddingRight: '18px',
      color: '#34966D',
    }}
  >
    {message}
  </button>
);

export const ErrorBar = ({ onClick = () => {}, message }: { onClick?: () => any; message: string }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex p-2 w-full font-circular whitespace-pre-wrap flex-wrap justify-center content-center font-normal"
    style={{
      background: 'rgba(246, 81, 81, 1)',
      marginTop: '20px',
      borderRadius: '4px',
      height: '40px',
      color: 'white',
      fontSize: '16px',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '18px',
      paddingRight: '18px',
      lineHeight: '20px',
    }}
  >
    {message}
  </button>
);
