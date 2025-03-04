const PageTop = ({ children }: { children?: string }) => {
  return (
    <div className='page-top rounded-t w-full h-max'>
      <div className='rounded-t bg-linear-to-r from-red-400 to-transparent text-white text-4xl font-bold px-6 py-12'>
        {children}
      </div>
    </div>
  );
};

export default PageTop;
