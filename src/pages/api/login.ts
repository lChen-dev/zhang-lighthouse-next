import { NextApiHandler } from 'next';

const login: NextApiHandler = (req, res) => {
  const params = new URLSearchParams();

  if (req.query.redirectTo) params.set('post_login_url', String(req.query.redirectTo));
  if (req.query.inviteCode) params.set('inviteCode', String(req.query.inviteCode));

  res.redirect(`/?${params.toString()}`);
};

export default login;
