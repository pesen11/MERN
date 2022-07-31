// create label with name, image,link(optional), type:[banner, brand],status:[active,inactive]
const LabelServices = require("../Services/labelServices");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "apiDB";
const mydb = require("../Services/coreMongoService");
const Label = require("../Models/labelModel");

class LabelContoller {
  constructor() {
    this.lblsrvsObj = new LabelServices();
  }
  createLabel = async (req, res, next) => {
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      let labelCreationError = this.lblsrvsObj.labelCreationValidation(data);
      if (labelCreationError) {
        next({
          status: 400,
          msg: labelCreationError,
        });
      } else {
        data.slug = this.lblsrvsObj.getLabelSlug(data.title);

        let label = new Label(data);
        let ack = await label.save();
        res.json({
          result: label,
          status: true,
          msg: "Label created!",
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  getAllLabels = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.type) {
        filter = {
          type: req.query.type,
        };
      }

      let data = await Label.find(filter);
      res.json({
        result: data,
        status: true,
        msg: "Label fetched succesfully",
      });
      /*
      let filter = {};

      if (req.query.type) {
        filter = {
          type: req.query.type,
        };
      }

      let db = await mydb();
      let data = await db.collection("labels").find(filter).toArray();
      res.json({
        result: data,
        status: true,
        msg: "Fetched All Labels",
      });*/
    } catch (error) {
      next({
        status: 500,
        msg: error,
      });
    }
  };

  getLabelById = async (req, res, next) => {
    try {
      let data = await Label.findById(req.params.id);
      res.json({
        result: data,
        msg: "Fetched succesfully",
        status: true,
      });
    } catch (err) {
      next({
        msg: err,
        status: 500,
      });
    }
  };

  updateLabel = async (req, res, next) => {
    let data = req.body;
    // console.log(data);

    if (req.file) {
      data.image = req.file.filename;
    }

    try {
      let labelCreationError = this.lblsrvsObj.labelCreationValidation(
        data,
        true
      );
      if (labelCreationError) {
        next({
          status: 400,
          msg: labelCreationError,
        });
      } else {
        let ack = await Label.findByIdAndUpdate(req.params.id, {
          $set: data,
        });
        res.json({
          result: data,
          status: true,
          msg: "Entry updated successfully",
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };

  deleteLabelById = async (req, res, next) => {
    try {
      let data = await Label.findById(req.params.id);
      if (data) {
        let ack = await Label.findByIdAndDelete(req.params.id);
        res.json({
          msg: "Deleted entry succesfully",
          status: true,
        });
      }
    } catch (error) {
      next({
        status: 400,
        msg: error,
      });
    }
  };
}

module.exports = LabelContoller;
