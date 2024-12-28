import React, { useState } from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CloseIcon from '@mui/icons-material/Close'; // Impor CloseIcon
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const IconChatbot = () => {
  // State untuk mengontrol tampilan ikon
  const [isClicked, setIsClicked] = useState(false);

  // Fungsi untuk mengubah state ketika ikon diklik
  const toggleIcon = () => {
    setIsClicked(!isClicked);
  }

  // Style untuk animasi
  const iconStyle = {
    transition: 'transform 0.5s ease-in-out, color 0.5s ease-in-out',
    transform: isClicked ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1)',
    color: isClicked ? '#FF5733' : '#006633', // Warna lebih dinamis ketika diklik
  }

  return (
    <div className='fixed bottom-5 right-5 border rounded-full p-1 transition group hover:scale-110'>
        <Tooltip title="Tanyakan Aku" placement="left-start">
          <IconButton onClick={toggleIcon} size="large">
            {isClicked ? (
              <CloseIcon style={iconStyle} />
            ) : (
              <QuestionAnswerIcon style={iconStyle} />
            )}
          </IconButton>
        </Tooltip>
    </div>
  )
}
