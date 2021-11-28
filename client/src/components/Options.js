import React from 'react';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { paths } from '../../misc';
import { SpeedDialAction } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import useNotification from '../hooks/notifications';

const CLEAR_LOCAL_STORAGE = 'Clear local storage';

const Options = ({ data, clearData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { Notification, nofity } = useNotification();
  const { FRONT, MY_ECONOMY, RAW_DATA } = paths;
  const handleDeleteData = () => {
    clearData();
    nofity('Local storage cleared!', 'info');
  };
  const noData = !Boolean(data);
  const actions = [
    {
      icon: <HomeRoundedIcon color="primary" />,
      name: FRONT.label,
      handleClick: () => navigate(FRONT.path),
      selected: pathname === FRONT.path,
    },
    {
      icon: <TimelineRoundedIcon color={noData ? 'disabled' : 'success'} />,
      name: MY_ECONOMY.label,
      handleClick: () => navigate(MY_ECONOMY.path),
      selected: pathname === MY_ECONOMY.path,
      disabled: noData,
    },
    {
      icon: <StorageRoundedIcon color={noData ? 'disabled' : 'warning'} />,
      name: RAW_DATA.label,
      handleClick: () => navigate(RAW_DATA.path),
      selected: pathname === RAW_DATA.path,
      disabled: noData,
    },
    {
      icon: <HighlightOffRoundedIcon color={noData ? 'disabled' : 'error'} />,
      name: CLEAR_LOCAL_STORAGE,
      handleClick: handleDeleteData,
      disabled: noData,
    },
  ];

  return (
    <>
      {actions.map(({ name, icon, handleClick, selected, disabled }) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          tooltipTitle={name}
          onClick={handleClick}
          open
          tooltipPlacement="bottom"
          FabProps={{
            disabled,
          }}
        />
      ))}
      <Notification />
    </>
  );
};
export default Options;
