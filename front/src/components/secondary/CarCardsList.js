import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useContext } from 'react';
import Context from '../../context/context';
import Car from '../Car';
function CarCardsList({ list, settings }) {
  const { postcodeInformation } = useContext(Context);
  return (
    list.length > 0 &&
    list.map((item, i) => {
      return (
        <Grid key={i + 658} item sm={12} md={list.length > 1 ? 4 : 8} lg={6}>
          <Car
            key={item._id}
            item={item}
            options={settings}
            usersPostcodeDataFromContext={postcodeInformation}
          />
        </Grid>
      );
    })
  );
}
export default React.memo(CarCardsList);
