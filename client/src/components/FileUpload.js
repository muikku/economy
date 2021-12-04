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
    const addNewData = () => {
      const oldDataInStorage = window.localStorage.getItem(TRANSACTIONS_KEY);
      if (oldDataInStorage == null)
        return window.localStorage.setItem(
          TRANSACTIONS_KEY,
          JSON.stringify(parsed)
        );
      const parsedOldData = JSON.parse(oldDataInStorage);
      const namesInOldData = parsedOldData.map((entry) => entry.name);
      const merged = parsed.reduce((prev, curr) => {
        if (namesInOldData.includes(curr.name))
          return prev.map((entry) => (entry.name === curr.name ? curr : entry));
        return prev.concat(curr);
      }, parsedOldData);
      return window.localStorage.setItem(
        TRANSACTIONS_KEY,
        JSON.stringify(merged)
      );
    };
    addNewData();
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
