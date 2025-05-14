import { useEffect } from 'react';
import '../../styles/Uploaded.module.scss';
import { Box, SimpleGrid } from '@chakra-ui/react';
import UploadedFileCard from '../ui/components/uploaded_file_card';
import { UploadedFileRM } from '../model/uploaded-file-r-m';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  deleteFile,
  downloadUploadedFiles,
  getUploadedFiles,
  updateTotal,
} from '../redux/slices/uploadedFilesSlice/uploadedFilesSlice';

export default function Uploaded() {
  const dispatch = useAppDispatch();

  const uploadedList = useAppSelector(getUploadedFiles);

  useEffect(() => {
    dispatch(downloadUploadedFiles());
  }, []);

  return (
    <>
      {!!uploadedList?.length && (
        <SimpleGrid minChildWidth="240px" spacing="40px">
          {uploadedList.map((uploadedFile: UploadedFileRM) => (
            <Box key={uploadedFile.id}>
              <UploadedFileCard
                uploadedFile={uploadedFile}
                onDelete={() => dispatch(deleteFile(uploadedFile.savedFileName))}
                onUpdate={(newTotal, savedFileName) =>
                  dispatch(updateTotal({ newTotal, savedFileName }))
                }
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
