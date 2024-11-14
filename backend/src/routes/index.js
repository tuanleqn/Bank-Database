const UserRouter = require("./UserRouter");
const AuthRouter = require("./AuthRouter");
const AdminRouter = require("./AdminRouter");
const CustomerRouter = require("./CustomerRouter");

const routes = (app) => {
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/admin", AdminRouter);
  app.use("/customer", CustomerRouter);
};

module.exports = routes;
