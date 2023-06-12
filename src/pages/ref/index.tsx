// blank /ref page should go to home instead of showing 404

const index = () => {};

index.getInitialProps = ({ res }: any) => {
  res.writeHead(302, { Location: '/' });
  res.end();
  return {};
};

export default index;
