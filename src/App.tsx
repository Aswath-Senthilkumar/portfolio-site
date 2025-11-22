import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useEffect } from 'react'
import LoadingAnimation from '@/components/animations/LoadingAnimation'

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {!animationComplete ? (
        <LoadingAnimation onComplete={() => setAnimationComplete(true)} />
      ) : (
        <>
        </>
      )}
    </div>
  );
}

export default App
