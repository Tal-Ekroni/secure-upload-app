import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { filesService } from "../services/uploadFiles.service";
import UserTutorial from "./UserTutorial";

const UploadFile: React.FC<{}> = ({ }) => {
  const SUCCESS_MSG = "File Uploaded Succsecfully."
  const ERROR_MSG = "Something went wrong."

  const [isLoading, setIsLoading] = useState(false)
  const [userMsgTxt, setUserMsgTxt] = useState('Upload')
  const [fileInBucket, setFileInBucket] = useState('')

  const handleFile = async (ev: React.FormEvent) => {
    try {
      setIsLoading(true)
      const target = ev.target as HTMLInputElement;

      const file = target.files?.[0]
      const fileType = file?.name
      const fileName = file?.type
   
      const s3Url = await filesService.getS3URL(fileName, fileType)
      await filesService.uploadFile(s3Url, file)

      const fileInBucketLink = s3Url.split('?')[0]
      setFileInBucket(fileInBucketLink)
      setIsLoading(false)
      setUserMsgTxt(SUCCESS_MSG)
    } catch (err) {
      console.log(err);
      setUserMsgTxt(ERROR_MSG)
      setIsLoading(false)
    }
  };

  return (
    <section className="upload-container">
      <UserTutorial />
      {!isLoading ?
        <Button
          variant="contained"
          style={{ width: "100%", backgroundColor: "#9246FF" }}
          component="label">
          {userMsgTxt}
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={(ev) => handleFile(ev)}
          />
        </Button> :
        <CircularProgress />
      }
      {fileInBucket && <div className="uploaded-file-link">
        <a href={fileInBucket}>Your new file is <span style={{ textDecoration: "underline" }}>here</span></a>
      </div>}
    </section>
  );
};
export default UploadFile;
