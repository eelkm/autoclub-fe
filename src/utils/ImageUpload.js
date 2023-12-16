import axios from "axios";
import { BackendURL } from "./constants";

const uploadFileToS3 = async (file, token) => {
  try {
    // Get secure S3 Secure URL
    const s3UrlResponse = await axios.get(`${BackendURL}/s3url`, {
      headers: {
        Authorization: token,
      },
    });

    const s3UrlData = s3UrlResponse.data;

    if (s3UrlData.success) {
      const s3ImageUrl = await uploadImageToS3(file, s3UrlData.url);
      return s3ImageUrl;
    } else {
      console.error("Error:", s3UrlData.error);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null;
  }
};

const uploadImageToS3 = async (file, url) => {
  try {
    const s3ImageUrl = url.split("?")[0];

    // Upload image to S3 bucket
    await axios.put(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return s3ImageUrl;
  } catch (error) {
    console.error("Failed to upload image to S3 bucket:", error);
    return null;
  }
};

export { uploadFileToS3 };