const adminAuth = (req, res, next) => {
  console.log("Admin Middleware");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorised Admin");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User Middleware");
  const token = "xyzd";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorised user");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
