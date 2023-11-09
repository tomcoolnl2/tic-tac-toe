import React from 'react';


const getOrientation = (): OrientationType => window.screen?.orientation?.type;

export const useScreenOrientation = () => {
    const [orientation, setOrientation] = React.useState<OrientationType>(getOrientation())
  
    const updateOrientation = () => {
      setOrientation(getOrientation())
    }
  
    React.useEffect(() => {
      
        window.addEventListener('orientationchange', updateOrientation);
      
        return () => {
            window.removeEventListener('orientationchange', updateOrientation);
        }
    }, [])
  
    return orientation
  }