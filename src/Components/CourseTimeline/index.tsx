import React from 'react';
import {
    Typography,
    Card,
    CardContent,
    Box,
    createTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';

interface Class {
    className: string;
    description: string;
    guruName: string;
    startDateTime: string;
    endDateTime: string;
}

interface MonthData {
    classes: Class[];
    studentId: string;
    month: number;
    year: number;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                    borderRadius: '8px',
                },
            },
        },
    },
});

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const ClassTimeline = ({ data }: any) => {
    const sortedData = [...data].sort((a, b) => {
        return b.year - a.year || b.month - a.month;
    });

    return (
        <Box maxWidth="md" margin="auto" padding={0}>
            <Box>
                {sortedData.map((monthData, index) => (
                    <Box key={index} position="relative" paddingLeft={3} marginBottom={2}>
                        <Box
                            position="absolute"
                            left={0}
                            top={10}
                            width={10}
                            height={10}
                            bgcolor="grey.400"
                            borderRadius="50%"
                        />
                        {index !== sortedData.length - 0 && (
                            <Box
                                position="absolute"
                                left={4}
                                top={20}
                                bottom={0}
                                width={'2px'}
                                height={'100%'}
                                bgcolor="grey.400"
                            />
                        )}
                        <Typography variant="h6" gutterBottom>
                            {`${monthNames[monthData.month - 1]} ${monthData.year}`}
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            {monthData.classes.map((classItem: any, classIndex: any) => (
                                <Card key={classIndex} variant="outlined">
                                    <CardContent style={{padding:'5px 10px'}}>
                                        <Typography variant="body1" fontWeight="bold">{classItem.className}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid size={{xs:6}}>
                                                <Typography variant="body2" color="text.secondary">Guru Name:{classItem.guruName}</Typography>
                                            </Grid>
                                            <Grid size={{xs:6}}>
                                                <Typography variant="body2" color="text.secondary">Date:{dayjs(classItem.startDateTime).format("MMMM D, YYYY h:mm A")} -
                                                    {dayjs(classItem.endDateTime).format("h:mm A")}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Typography style={{ whiteSpace: 'pre-line', marginTop:10, backgroundColor:theme.palette.grey[100], borderRadius:5, fontSize:13, color:'text.secondary', border:'1px solid #eee', padding:'4px 10px' }}>
                                            {classItem.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}


export default ClassTimeline;