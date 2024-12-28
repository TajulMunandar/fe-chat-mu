import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const History = () => {
  return (
    <section className='min-h-screen w-full bg-gray-100 py-3 border px-5 font-[poppins]'>
      <div className='flex gap-5 mb-3 items-center'>
        <Link to="/Hubungi-Admin" className='text-slate-600'><ArrowBackIosIcon /></Link>
        <h1 className='text-2xl font-bold'>History Sebelumnya!</h1>
      </div>
      <Card sx={{ minWidth: 275 , mb: 1.5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">#beasiswa</Button>
          <Button size="small">#spp</Button>
          <Button size="small">#ukt</Button>
        </CardActions>
      </Card>

    </section>
  );
};

export default History;
