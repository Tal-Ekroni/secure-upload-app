import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { filesService } from "../services/uploadFiles.service";
import UserTutorial from "./UserTutorial";


const UploadFile: React.FC<{}> = ({ }) => {
  const SUCCESS_MSG = "File Uploaded Succsecfully."
  const ERROR_MSG = "Something went wrong."

  const [isLoading, setIsLoading] = useState(false)
  const [userMsgTxt, setUserMsgTxt] = useState('Upload')

  const handleFile = async (ev: React.FormEvent) => {
    try {
      setIsLoading(true)
      const target = ev.target as HTMLInputElement;
      let file = target.files?.[0]
      let fileType
      let fileName
      if (file) {
        fileName = file.name
        fileType = file.type
      }

      const s3Url = await filesService.getS3URL(fileName, fileType)
      const succes = await filesService.uploadFile(s3Url, file)
      console.log(succes);

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
    </section>
  );
};
export default UploadFile;
