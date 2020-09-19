import React from 'react';
import PropTypes from 'prop-types';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PDFViewer from 'src/components/PDFViewer';
import { Grid, Button } from '@material-ui/core';

function PDFViewerComponent({
  id,
  file,
  name,
  url,
  actionButton,
  backButton,
  handleClickSelectedFileEvent,
  fileType,
}) {
  return (
    <Grid
      container
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
      }}
    >
      <Grid
        item
        lg={12}
        md={12}
        xs={12}
        style={{ paddingLeft: 20, marginBottom: 10 }}
      >
        <Button startIcon={<ArrowBack />} size="medium" onClick={backButton}>
          Back
        </Button>
      </Grid>
      <Grid
        item
        lg={4}
        md={4}
        xs={4}
        style={{ paddingLeft: 20, marginBottom: 20, fontSize: 20 }}
      >
        {name}
      </Grid>
      <Grid item lg={8} md={8} xs={8}>
        <Grid
          container
          style={{
            paddingRight: 20,
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {actionButton &&
            Array.isArray(actionButton) &&
            actionButton.length !== 0 &&
            actionButton.map(
              (actButton, index) =>
                actButton.condition && (
                  <Grid
                    item
                    key={`action-${id}-${index}`}
                    lg={parseInt(12 / actionButton.length, 10)}
                    md={parseInt(12 / actionButton.length, 10)}
                    xs={parseInt(12 / actionButton.length, 10)}
                    style={{ paddingLeft: 10, marginBottom: 10 }}
                  >
                    <Button
                      startIcon={actButton.icon || null}
                      size="medium"
                      fullWidth
                      style={{
                        backgroundColor: actButton.backgroundColor,
                        color: 'white',
                        minWidth: 150,
                      }}
                      onClick={() => {
                        handleClickSelectedFileEvent(
                          file,
                          actButton.action,
                          fileType,
                        );
                      }}
                    >
                      {actButton.label}
                    </Button>
                  </Grid>
                ),
            )}
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        {/* Props File ganti sama variabel yang nyimpen url */}
        <PDFViewer file={url} />
      </Grid>
    </Grid>
  );
}

PDFViewerComponent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  handleClickSelectedFileEvent: PropTypes.func,
  backButton: PropTypes.func,
  actionButton: PropTypes.array,
  fileType: PropTypes.string,
};

export default PDFViewerComponent;
