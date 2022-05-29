import { history } from './history';
import { validateTokenExpired } from './tokenHandle';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    const isUnauthorizedRequest =
      response.status === 401 || response.status === 403;
    if (isUnauthorizedRequest) history.push('/error/401');
    switch (response.status) {
      case 500:
        history.push('/error/500');
        break;
      case 404:
        history.push('/error/404');
        break;
      case 400:
        history.push('/error/400');
        break;
      default:
        throw response;
    }

    window.location.reload();
  }

  return parseJson(response);
};

const parseJson = async (response: Response) => {
  const text = await response.text();
  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    return text;
  }
};

const headersWithToken = (): HeadersInit => {
  const result = JSON.parse(localStorage.getItem('AccessToken') || '{}');
  if (Object.keys(result).length === 0) {
    return {
      'Content-Type': 'application/json',
    };
  }
  return {
    Authorization: `Bearer ${result.accessToken}`,
    'Content-Type': 'application/json',
  };
};

const getAsync = async <TResponse>(apiUrl: string): Promise<TResponse> => {
  const response = await fetch(apiUrl, {
    headers: headersWithToken(),
  });

  return handleResponse(response);
};

const postAsync = async <TRequest, TResponse>(
  apiUrl: string,
  data: TRequest,
): Promise<TResponse> => {
  return handleRequestAsync(apiUrl, data, 'POST');
};

const putAsync = async <TRequest, TResponse>(
  apiUrl: string,
  data: TRequest,
): Promise<TResponse> => {
  return handleRequestAsync(apiUrl, data, 'PUT');
};

const deleteAsync = async <TRequest, TResponse>(
  apiUrl: string,
  data: TRequest,
): Promise<TResponse> => {
  return handleRequestAsync(apiUrl, data, 'DELETE');
};

const handleRequestAsync = async <TRequest, TResponse>(
  apiUrl: string,
  data: TRequest,
  method: string,
): Promise<TResponse> => {
  try {
    const response = await fetch(apiUrl, {
      headers: headersWithToken(),
      method: method,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  } catch (error) {
    history.push('/error/401');
    throw Error('Token Expired');
  }
};

export { getAsync, postAsync, putAsync, deleteAsync };
