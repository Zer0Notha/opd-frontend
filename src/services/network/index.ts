import axios, { AxiosError } from 'axios';
import { globals } from '@config/globals';
import { toast } from 'react-toastify';

interface ApiErrorResponse {
	error: {
	  status: number;
	  message: string;
	};
  }

export const network = axios.create({
	baseURL: globals.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	},
	withCredentials: true,
});

network.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ApiErrorResponse>) => {
	  // Проверяем, является ли ошибка ответом от сервера
	  if (error.response) {
		// Если статус 401 и путь не /register или /auth, перенаправляем на страницу /auth
		if (
		  error.response.status === 401 &&
		  window.location.pathname !== '/register' &&
		  window.location.pathname !== '/auth'
		) {
		  window.location.replace('/auth');
		}
		
		else if(error.response.data.error.message){
			toast.error(error.response.data.error.message);
		}
		else{
			console.error(error)
		}
	  } else {
		// Здесь можно обработать другие ошибки, такие как ошибки сети
		console.error('Ошибка сети или запроса:', error.message);
	  }
	  
	  // Пробрасываем оригинальную ошибку для дальнейшей обработки
	  return Promise.reject(error);
	}
  );
