import { useState } from 'react'
import { Button, Typography, Container, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center">
      <Container maxWidth="sm">
        <Box textAlign="center" py={5}>
          <Typography variant="h2" gutterBottom className="text-green-800">
            VisionPlant
          </Typography>
          <Typography variant="h5" className="mb-4">
            Descubre la salud de tu planta con un clic
          </Typography>
          <Typography variant="body1" className="mb-8">
            Con VisionPlant, nuestra IA analiza tus fotos de plantas para identificar enfermedades y ofrecerte soluciones. ¡Cuida mejor de tus plantas con la ayuda de la tecnología!
          </Typography>
          
        </Box>
      </Container>
    </div>
  )
}

export default App
