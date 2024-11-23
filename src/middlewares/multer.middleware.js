import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG images are allowed."), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024,
  },
  fileFilter,
});
