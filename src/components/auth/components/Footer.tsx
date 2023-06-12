import { GroupIcon } from './GroupIcon';

const Footer = (): React.ReactElement => (
  <>
    <a href="/">
      <button
        type="button"
        style={{ marginTop: '4px' }}
        className="w-full bg-white hidden mbp:block h-14 font-bold text-lg font-circular outline-none focus:outline-none -translate-y-10 transform text-gray-soft rounded "
      >
        Go to Home
      </button>
    </a>
    <div className="mt-8 hidden mbp:block">
      <GroupIcon />
    </div>
  </>
);

export const FooterImage = (): React.ReactElement => (
  <div className="mt-20 hidden mbp:block">
    <GroupIcon />
  </div>
);

export default Footer;
