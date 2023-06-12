const blackListedIps = require('../../blacklisted-ips.json');
const blackListedIds = require('../../blacklisted-uids.json');

/* Server-side only! */
const blockVisitors = ({ req, res }: any): boolean => {
  if (!req) return false;

  const { ga_user: gaUser } = req.cookies;
  let IP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  IP = IP && IP.split('.').length === 4 && !IP.includes('::') ? IP : 'localhost';
  if (blackListedIps.includes(IP) || blackListedIds.includes(gaUser)) {
    return true;
  }
  return false;
};

export default blockVisitors;
