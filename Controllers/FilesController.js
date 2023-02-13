const File = require("../Models/File");
class FilesController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "No file was uploaded." });
      }

      const filePath = req.file.path;
      const userId = req.user._id; 

      await File.create({
        filePath: req.file.path,
        fileName: req.file.filename,
        userId,
      });

      return res.send({ message: "File was uploaded successfully", filePath });
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserFiles(req, res) {
   try {
    const userId = req.session.passport.user;

    if (!userId) {
      return res.status(400).send("userId required");
    }
    let files = await File.find({ userId: userId });

    return res.render("myfiles", { files });
   } catch (error) {
    console.log(error);
   }
  }

  static async downloadFile(req, res) {
    try {
      const filePath = req.query.filepath;

      res.download(filePath);
    } catch (error) {
    console.log(error);
      
    }
  }
}

module.exports = FilesController;
