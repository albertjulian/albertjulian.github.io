import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  colors,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import bytesToSize from 'src/utils/bytesToSize';
import Label from 'src/components/Label';
import PopButton from 'src/components/PopButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  getAppIcon: {
    marignRight: theme.spacing(1),
  },
  menu: {
    width: 250,
    maxWidth: '100%',
  },
  label: {
    marginBottom: theme.spacing(1),
  },
  fileTitle: {
    maxWidth: '90%',
  },
  fileSkeletonImage: {
    cursor: 'pointer',
    height: '100%',
  },
}));

function FileCard({
  id,
  file,
  menu,
  actionButton,
  fileType,
  handleClickSelectedFileEvent,
  ...rest
}) {
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const badgeColor = {
    APPROVED: colors.green[600],
    REVISED: colors.yellow[700],
    NEW: colors.orange[700],
    'PENDING APPROVAL': colors.orange[700],
    WAITING_FOR_PAYMENT: colors.yellow[700],
    CANCELLED: colors.red[700],
    COMPLETED: colors.green[600],
  };

  const badgeWording = {
    APPROVED: 'APPROVED',
    REVISED: 'REVISED',
    NEW: 'WAITING FOR APPROVAL',
    'PENDING APPROVAL': 'PENDING APPROVAL',
    WAITING_FOR_PAYMENT: 'WAITING FOR PAYMENT',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED',
  };

  const _handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const _handleMenuClose = () => {
    setOpenMenu(false);
  };

  const _checkActionButtonValid = (allActionButton) => {
    let flag = false;

    if (allActionButton) {
      for (let i = 0; i < allActionButton.length; i += 1) {
        if (allActionButton[i].condition) {
          flag = true;
          break;
        }
      }
    }

    return flag;
  };

  return (
    <Card {...rest}>
      {/* start file icon */}
      <CardMedia
        component="img"
        className={classes.fileSkeletonImage}
        image="/images/file.png"
        title="File"
        onClick={() => handleClickSelectedFileEvent(file, 'view', fileType)}
      />
      {/* end file icon */}

      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={classes.label}>
              <Label color={badgeColor[file.status]}>
                {badgeWording[file.status]}
              </Label>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.content} container>
            <Grid item xs={11}>
              <Typography variant="h5" noWrap className={classes.fileTitle}>
                {file.name}
              </Typography>
              {file.size && (
                <Typography variant="subtitle2">
                  {bytesToSize(file.size)}
                </Typography>
              )}
            </Grid>

            {menu && Array.isArray(menu) && menu.length !== 0 && (
              <Grid item xs={1}>
                <Tooltip title="More options">
                  <IconButton
                    edge="end"
                    onClick={_handleMenuOpen}
                    ref={moreRef}
                    size="small"
                  >
                    <MoreIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        {menu && Array.isArray(menu) && menu.length !== 0 && (
          <Menu
            anchorEl={moreRef.current}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            classes={{ paper: classes.menu }}
            onClose={_handleMenuClose}
            elevation={1}
            open={openMenu}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {menu.map((menuChild, index) => (
              <MenuItem
                key={`action-${id}-${menuChild.label}-${index}`}
                onClick={() => {
                  setOpenMenu(false);
                  handleClickSelectedFileEvent(
                    file,
                    menuChild.action,
                    fileType,
                  );
                }}
              >
                <ListItemIcon>{menuChild.icon || <GetAppIcon />}</ListItemIcon>
                <ListItemText primary={menuChild.label} />
              </MenuItem>
            ))}
          </Menu>
        )}
      </CardContent>

      <Divider />

      {actionButton &&
        Array.isArray(actionButton) &&
        actionButton.length !== 0 &&
        _checkActionButtonValid(actionButton) && (
          <CardActions>
            {actionButton.map(
              (actButton, index) =>
                actButton.condition && (
                  <PopButton
                    key={`action-${id}-${actButton.label}-${index}`}
                    style={{
                      backgroundColor: actButton.backgroundColor || 'blue',
                      color: actButton.color || 'white',
                    }}
                    color="warning"
                    type="button"
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      handleClickSelectedFileEvent(file, actButton.action, id)
                    }
                  >
                    {actButton.label}
                  </PopButton>
                ),
            )}
          </CardActions>
        )}
    </Card>
  );
}

FileCard.propTypes = {
  id: PropTypes.string,
  file: PropTypes.object.isRequired,
  handleClickSelectedFileEvent: PropTypes.func,
  menu: PropTypes.array,
  actionButton: PropTypes.array,
  fileType: PropTypes.string,
};

export default FileCard;
