const Sqlite = require("sqlite");
const Sqlite3 = require("Sqlite3");

const dbFilename = "./webapps.db";

Sqlite3.verbose();

module.exports = {
  connect() {
    return (
      Sqlite.open({
        filename: dbFilename,
        driver: Sqlite3.Database,
      })
        //   .then((db) => {
        //     console.log(db);
        //   })
        .catch((err) => {
          console.log("DB.connect failed with error:" + err);
        })
    );
  },
};
