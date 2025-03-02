const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="error-fallback flex items-center justify-center"
    >
      <p className="text-slate-900 text-lg">Oops! Somthing went wrong.</p>
    </div>
  );
};

export default ErrorFallback;
