import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material'; // Assuming you are using Material-UI


const DashboardCountCard = ({ title, count, bgColor, imgPath, width }: any) => {

    return (
        <Card sx={{ minWidth: 275, margin:0, width:width, textAlign: 'left', background: bgColor, position:'relative',overflow:'visible' }}>
            <CardContent>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',}}>
                    <div style={{width:'70%'}}>
                        <Typography variant="h5" style={{ fontSize: 14, fontWeight:'bold' }} component="div">
                            {title}
                        </Typography>
                        <Typography variant="h2" color="text.secondary">
                            {count}
                        </Typography>
                    </div>
                    <div style={{width:'30%'}}>
                       
                    </div>
                </div>

                <img style={{ maxWidth: '100%',position: 'absolute', right: 0, height: '160%',top: '-77px' }} src={`${process.env.PUBLIC_URL}/${imgPath}`} />
            </CardContent>
        </Card>
    );
};

export default DashboardCountCard;