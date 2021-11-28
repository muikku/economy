import { CardHeader } from '@mui/material';
import React from 'react';
import FileUpload from './FileUpload';

const Front = ({ getAndSetData }) => {
  return (
    <>
      <CardHeader
        title="What does this app do?"
        subheader="This app simply draws a chart and a table from data you can provide."
      />
      <CardHeader
        title="How to use it?"
        subheader="Download all your bank account transactions from Nordea. It should be a .txt file. Then upload them and see the graphs"
      />
      <CardHeader
        title="How is my data used?"
        subheader="App saves only how much income and how much spending has been done per month. Other informations is deleted. Data is saved to browsers local storage"
      />
      <FileUpload getAndSetData={getAndSetData} />
    </>
  );
};
export default Front;
