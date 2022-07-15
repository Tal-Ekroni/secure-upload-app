import { Button } from "@mui/material";
import { filesService } from "../services/uploadFiles.service";


const UploadFile: React.FC<{}> = ({ }) => {


  const handleFile = async (ev: React.FormEvent) => {
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
    // const succes =  await fetch(s3Url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": fileType ? fileType : "multipart/form-data"
    //   },
    //   body: file
    // })

    console.log(succes);

  };
  return (
    <div className="upload-container">
      <Button
        variant="contained"
        component="label">
        Upload File
        <input
          type="file"
          hidden
          accept="image/png, image/jpeg, application/pdf, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={(ev) => handleFile(ev)}
        />
      </Button>
    </div>
  );
};
export default UploadFile;
