import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paginate from 'src/components/Paginate';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PDFViewer = ({ file }) => {
  const classes = useStyles();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const _onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
  };

  return (
    <div className={classes.container}>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Paginate
          pageCount={numPages}
          initialPage={pageNumber}
          onPageChange={(selectedPage) => {
            setPageNumber(Number(selectedPage.selected));
          }}
        />
      </div>
      <Document
        file={file}
        onLoadSuccess={_onDocumentLoadSuccess}
        loading={<CircularProgress />}
      >
        <Page
          pageNumber={pageNumber + 1}
          loading={<CircularProgress />}
          width={1024}
        />
      </Document>
    </div>
  );
};

PDFViewer.propTypes = {
  file: PropTypes.any,
};

export default PDFViewer;
