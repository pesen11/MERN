const slugify = require("slugify");
class LabelServices {
  labelCreationValidation = (data, is_edit = false) => {
    let err_msg = {};
    if (!data.title) {
      err_msg["title"] = "Title value missing.";
    }

    if (!is_edit) {
      if (!data.image) {
        err_msg["image"] = "Image for label is required.";
      }
    }

    if (!data.type) {
      err_msg["Type"] = "Type is missing";
    } else {
      if (data.type !== "banner" && data.type !== "brand") {
        err_msg["Type"] = "Type should be either banner or brand";
      }
    }

    if (!data.status) {
      err_msg["status"] = "Please do set a status.";
    } else {
      if (data.status !== "active" && data.status !== "inactive") {
        err_msg["status"] = "Status should be set to either active or inactive";
      }
    }

    if (Object.keys(err_msg).length) {
      return err_msg;
    } else {
      return null;
    }
  };

  getLabelSlug = (str) => {
    return slugify(str.toLowerCase());
  };
}

module.exports = LabelServices;
