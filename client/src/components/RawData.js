import { CardActionArea, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';
import { paths } from '../../misc';
import useNotification from '../hooks/notifications';

const RawData = ({ data }) => {
  const { Notification, notify } = useNotification();
  const JSONData = JSON.stringify(data, null, 2);
  const handleCopyOnClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSONData);
      notify('Copied to clipboard', 'success');
    } catch (error) {
      notify('Could not copy to clipboard', 'warning');
    }
  };
  if (!data) return <Navigate to={paths.FRONT.path} />;
  return (
    <>
      <CardActionArea onClick={handleCopyOnClipboard}>
        <CardHeader
          title="Data in local storage"
          subheader="Click to copy on clipboard"
        />
        <CardContent>
          <div>
            <pre>{JSONData}</pre>
          </div>
        </CardContent>
      </CardActionArea>
      <Notification />
    </>
  );
};

export default RawData;
