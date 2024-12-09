// src/pages/Contact.js
import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const Contact = () => {
    const contactDetails = [
        { label: 'Email', value: 'praveen@codingmstr.com', link: 'mailto:praveen@codingmstr.com' },
        { label: 'Website', value: 'www.codingmstr.com', link: 'https://codingmstr.com' },
        { label: 'WhatsApp', value: '+91-8789529215', link: 'https://wa.me/918789529215' },
        { label: 'YouTube', value: 'youtube.com/@codingmstr', link: 'https://www.youtube.com/@codingmstr' },
        { label: 'Instagram', value: 'instagram.com/codingmstr', link: 'https://www.instagram.com/codingmstr/' },
        { label: 'GitHub', value: 'github.com/ipraveenkmr', link: 'https://github.com/ipraveenkmr' },
    ];

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 4,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    Contact Us
                </Typography>
                <Box>
                    {contactDetails.map((detail, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                                {detail.label}:
                            </Typography>
                            <Link
                                href={detail.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    fontSize: '1rem',
                                    color: 'primary.main',
                                    fontWeight: 'medium',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {detail.value}
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;
