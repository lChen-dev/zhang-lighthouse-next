const redirect = (): null => null;
redirect.getInitialProps = (ctx: any): any => {
  const { req, res } = ctx;
  const urlParse = new URL(`http://yeet.com${req.url}`);
  let url = urlParse.searchParams.get('url') || '';
  
  // add http  if not exist
  if (url && !/^https?:\/\//i.test(url)) {
    url = `http://${url}`;
  }


  /**
   *  make sure some bad character isn't causing a redirect
   *  issue such as http:%20//%20 in case any space-typo
   * */
  url = decodeURI(decodeURIComponent(url));
  url = url.replace(/\s/gim, '').trim();

  if (res && url.includes('.')) {
    /**
        ░░░░░░░░▄▄▄███░░░░░░░░░░░░░░░░░░░░
        ░░░▄▄██████████░░░░░░░░░░░░░░░░░░░
        ░███████████████░░░░░░░░░░░░░░░░░░
        ░▀███████████████░░░░░▄▄▄░░░░░░░░░
        ░░░███████████████▄███▀▀▀░░░░░░░░░
        ░░░░███████████████▄▄░░░░░░░░░░░░░
        ░░░░▄████████▀▀▄▄▄▄▄░▀░░░░░░░░░░░░
        ▄███████▀█▄▀█▄░░█░▀▀▀░█░░▄▄░░░░░░░
        ▀▀░░░██▄█▄░░▀█░░▄███████▄█▀░░░▄░░░
        ░░░░░█░█▀▄▄▀▄▀░█▀▀▀█▀▄▄▀░░░░░░▄░▄█
        ░░░░░█░█░░▀▀▄▄█▀░█▀▀░░█░░░░░░░▀██░
        ░░░░░▀█▄░░░░░░░░░░░░░▄▀░░░░░░▄██░░
        ░░░░░░▀█▄▄░░░░░░░░▄▄█░░░░░░▄▀░░█░░
        ░░░░░░░░░▀███▀▀████▄██▄▄░░▄▀░░░░░░
        ░░░░░░░░░░░█▄▀██▀██▀▄█▄░▀▀░░░░░░░░
        ░░░░░░░░░░░██░▀█▄█░█▀░▀▄░░░░░░░░░░
        ░░░░░░░░░░█░█▄░░▀█▄▄▄░░█░░░░░░░░░░
        ░░░░░░░░░░█▀██▀▀▀▀░█▄░░░░░░░░░░░░░
        ░░░░░░░░░░░░▀░░░░░░░░░░░▀░░░░░░░░░
        .-. .-. .-.   . . .-. . .   .-. .-.
        | | |-  |-     |  | | | |   |.. | |
        `-' '   '      `  `-' `-'   `-' `-'
       */

    const urlObj = new URL(url);
    for (const [key, value] of urlParse.searchParams) {
      if (key !== 'url') {
        urlObj.searchParams.append(key, value);
      }
    }

    res.writeHead(302, { Location: urlObj.toString() });
    res.end();
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }

  return {};
};

export default redirect;
