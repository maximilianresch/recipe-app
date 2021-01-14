import { useState, useEffect } from 'react'


const breakpoints = {
    sm: 768
}


const getWindowDimensions = () => {
    if(typeof window === 'undefined') {
        return {
            width: 1920,
            height: 1080
        }
    }

    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
}

const useResponsive = () => {

    const [windowDimension, setWindowDimension] = useState(getWindowDimensions())

    

    useEffect(() => {

        const handleResize = () => {
            setWindowDimension(getWindowDimensions())
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    
    return {
        windowDimension,
        isDesktop: windowDimension.width > breakpoints.sm
    }
}
 
export default useResponsive;