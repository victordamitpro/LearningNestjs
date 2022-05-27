import { FC } from 'react';

const ErrorPage: FC = () => {
  return (
    <>
      <div>There are some errors...</div>
      <div>
        <a className="link" href="/login">
          Go Back
        </a>
      </div>
    </>
  );
};

export default ErrorPage;
