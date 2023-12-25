import { useNavigate } from 'react-router-dom';

export const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Esto es equivalente a history.goBack()
  };

  return { goBack };
};


