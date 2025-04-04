"use client";
import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';

function Page() {
  const [word, setWord] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWord = () => {
    if (!word.trim()) return;
    setLoading(true);
    setError(null);
    setData([]);

    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Word not found or API error.');
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Dictionary App
      </Typography>

      <TextField
        label="Enter a word"
        fullWidth
        variant="outlined"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={searchWord}
        sx={{ mb: 2 }}
      >
        Search
      </Button>

      {loading && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {data.length > 0 && (
        data.map((item, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h5">{item.word}</Typography>
              <Typography variant="subtitle1">
                {item.meanings[0]?.partOfSpeech}
              </Typography>
              <Typography variant="body1">
                Definition: {item.meanings[0]?.definitions[0]?.definition}
              </Typography>
              {item.meanings[0]?.definitions[0]?.example && (
                <Typography variant="body2" color="text.secondary">
                  Example: {item.meanings[0]?.definitions[0]?.example}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Page;
