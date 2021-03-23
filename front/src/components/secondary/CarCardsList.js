import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useContext } from 'react';
import Context from '../../context/context';
import Car from '../Car';
export default function CarCardsList() {
  console.log('cardlist container mounted');
  const context = useContext(Context);
  return context.list.map((item, i) => {
    return (
      <Grid key={i + 658} item sm={12} md={context.list.length > 1 ? 6 : 10}>
        <Car
          key={item._id}
          item={item}
          options={context.settings}
          usersPostcodeDataFromContext={context.postcodeInformation}
        />
      </Grid>
    );
  });
}
