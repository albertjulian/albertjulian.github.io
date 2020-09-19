import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  // IconButton, // uncomment if ellipsis is used
  // Tooltip,
  colors,
} from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
// import MoreIcon from '@material-ui/icons/MoreVert'; // uncomment if ellipsis is used
import bytesToSize from 'src/utils/bytesToSize';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  dropZone: {
    border: `2px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: '#F2F9FE',
      opacity: 0.5,
      cursor: 'pointer',
    },
  },
  dragActive: {
    backgroundColor: '#F2F9FE',
    opacity: 0.5,
  },
  image: {
    width: '100%',
    maxHeight: 180,
  },
  info: {
    marginTop: theme.spacing(1),
  },
  list: {
    maxHeight: 320,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const acceptedFileType = {
  image: 'image/*',
  file: 'application/pdf',
  fileAll: null,
};

function FilesDropzone({
  className,
  selectedFile,
  maxSizeFile,
  handleImage,
  initialFile = [],
  disabled,
  fileType = 'image',
  instantUpload = false,
  ...rest
}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(initialFile);
  }, []);

  const handleDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      // send base64 to parent / func props

      if (fileType === 'file' || fileType === 'fileAll') {
        handleImage(acceptedFiles[0]);
      } else if (fileType === 'image') {
        // send base64 to parent and raw file
        handleImage(reader.result, acceptedFiles[0]);
      }

      setFiles((prevFiles) =>
        [...prevFiles].concat(
          acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ),
      );
    };
    reader.onerror = (err) => console.error('err', err);
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
    if (fileType === 'image') {
      handleImage(null, null);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setFiles([]);
      handleImage(null);
    }
  }, [selectedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    minSize: 0,
    maxSize: maxSizeFile,
    // for accept type file
    accept: acceptedFileType[fileType],
    // for just accept only 1 file
    disabled: files.length > 0 || disabled,
  });

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {/* Input drop zone */}
      {
        files.length < 1 &&
        <div
          className={clsx({
            [classes.dropZone]: true,
            [classes.dragActive]: isDragActive,
          })}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div>
            <img
              alt="Select file"
              className={classes.image}
              src='/images/undraw_add_file2_gvbb_1.svg'
            />
          </div>
          <div>
            <Typography gutterBottom variant="h3">
              {(fileType === 'file' || fileType === 'fileAll') && 'Select File'}
              {fileType === 'image' && 'Select Image'}
            </Typography>
            <Typography
              className={classes.info}
              color="textSecondary"
              variant="body1"
            >
              Drop files here or click <Link underline="always">Browse </Link>
              thorough your files
            </Typography>
          </div>
        </div>
      }

      {!instantUpload && files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={uuid()}>
                  <ListItemIcon>
                    <InsertDriveFileOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  {/* for future use. conditionally by props */}
                  {/* <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip> */}
                  <div className={classes.actions}>
                    <Button onClick={handleRemoveAll} size="small">
                      Remove
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
        </>
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string,
  handleImage: PropTypes.func,
  disabled: PropTypes.bool,
  maxSizeFile: PropTypes.number,
  initialFile: PropTypes.array,
  selectedFile: PropTypes.object,
  fileType: PropTypes.string,
  instantUpload: PropTypes.bool,
};

export default FilesDropzone;
