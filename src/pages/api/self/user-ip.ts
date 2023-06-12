import { NextApiHandler } from 'next';

const getUserIP: NextApiHandler = async (req: any, res: any) => {
  // get visitor IP
  let IP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  IP = IP && IP.split('.').length === 4 && !IP.includes('::') ? IP : 'localhost';
  res.end(IP || '');
};

export default getUserIP;
