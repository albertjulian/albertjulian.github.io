import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import UniversityLogo from './../../icons/university_logo.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing * 3,
    paddingBottom: theme.spacing * 3,
  },
  cardRoot: {
    height: '100%',
    cursor: 'pointer',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    backgroundSize: 'contain',
    backgroundImage: `url(${UniversityLogo})`,
    backgrounRepeat: 'no-repeat',
    height: 50,
    width: 50,
  },
  cardName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
}));

function CardList({ data, favorite, handleFavorite }) {
  const classes = useStyles();
  const history = useHistory();

  const _viewUniversityDetail = (universityId) => {
    history.push(`/university/${universityId}/details`);
  };

  const isFavorite = () => {
    return Boolean(favorite.find((element) => element.name === data.name));
  }

  return (
    
    <Card className={classes.cardRoot} onClick={() => _viewUniversityDetail((data.domains && data.domains[0]) || data.name)}>
        <CardContent>
            <Grid container>  
                {
                    favorite &&
                    <Grid item xs={12} sm={12} lg={12} className={classes.cardName} style={{ alignItems: 'flex-end' }}>
                    {
                        isFavorite() ?
                        <IconButton color="secondary" aria-label="favorite" component="span" onClick={(e) => handleFavorite(e, data, 'remove')}>
                            <StarIcon />
                        </IconButton>
                        :
                        <IconButton color="default" aria-label="not-favorite" component="span" onClick={(e) => handleFavorite(e, data, 'add')}>
                            <StarBorderIcon />
                        </IconButton>
                    }
                    </Grid>
                }
                
                <Grid item xs={12} sm={3} lg={3} className={classes.cardName}>
                    <IconButton className={classes.cardIcon} />
                </Grid>
                <Grid item xs={12} sm={9} lg={9} className={classes.cardName}>
                    <Typography variant="h6" style={{ fontWeight: 600 }}>{`${data.name} (${data.alpha_two_code})`}</Typography>
                    <Typography variant="body1" style={{ fontStyle: 'italic', fontWeight: 300 }}>{data.country}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} className={classes.cardName} style={{ alignItems: 'flex-end' }}>
                    {
                        data.web_pages && data.web_pages[0] &&
                        <a href={data.web_pages[0]}>
                            <Typography variant="body2" style={{ fontWeight: 600 }}>{data.web_pages[0]}</Typography>
                        </a>
                    }
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
}

CardList.propTypes = {
    data: PropTypes.object.isRequired,
    favorite: PropTypes.array,
    handleFavorite: PropTypes.func,
};

export default CardList;
