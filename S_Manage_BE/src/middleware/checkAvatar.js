const checkAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    return res.status(400).json({ error: 'Missing avatar data' });
  }
  console.log('ok avtaar', req.body.avatar);
  next();
};

module.exports = checkAvatar;