const UserRouter = require("./UserRouter");
const AuthRouter = require("./AuthRouter");
const AdminRouter = require("./AdminRouter");

const routes = (app) => {
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/admin", AdminRouter);
};

module.exports = routes;
