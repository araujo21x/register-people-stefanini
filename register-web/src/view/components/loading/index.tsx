interface DefaultLoadingProps {
  isLoading: boolean;
}

export function DefaultLoading({ isLoading }: DefaultLoadingProps) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}