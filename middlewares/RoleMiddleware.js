export default (roles) => {
  return (req, res, next) => {
    try {
      let hasRole = false;
      req.user.roles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ code: "not-permision-role", data: "" });
      }
      next();
    } catch (error) {
      res.status(403).json({ code: "role-middleware-catch", data: "" });
    }
  };
};
