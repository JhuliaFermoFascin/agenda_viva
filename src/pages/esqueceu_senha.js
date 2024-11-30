import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const ForgotPasswordPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/Login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Esqueceu sua senha?
      </Typography>

      <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 1, maxWidth: '400px', textAlign: 'center' }}>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Caso tenha esquecido sua senha, por favor, entre em contato com nosso suporte no email:
        </Typography>
        <Typography variant="h6" color="primary">
          suporte@exemplo.com
        </Typography>
      </Box>

      <Button onClick={handleGoBack} variant="outlined" sx={{ marginTop: 4 }}>
        Voltar para o Login
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
