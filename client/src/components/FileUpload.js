import { CardHeader, TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import parseFiles from '../../utils/parseNordeaTransactions';
import { TRANSACTIONS_KEY } from '../hooks/logic';

const FileUpload = ({ getAndSetData }) => {
  const navigate = useNavigate();

  const onFileChange = async (event) => {
    const { files } = event.target;
    const noFiles = !files?.length >= 1;
    if (noFiles) return;
    const parsed = await parseFiles(files);
    window.localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(parsed));
    getAndSetData();
    navigate('/my-economy');
  };

  return (
    <>
      <CardHeader
        title="Add transactions"
        subheader={
          <TextField
            type="file"
            onChange={onFileChange}
            inputProps={{
              accept: 'text/plain',
              multiple: true,
            }}
          />
        }
      />
    </>
  );
};

export default FileUpload;
