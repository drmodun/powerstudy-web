import { useEffect, useState } from "react";

interface MediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

const useMediaQuery = (): MediaQueryResult => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryResult>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setMediaQuery({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return mediaQuery;
};

export default useMediaQuery;
