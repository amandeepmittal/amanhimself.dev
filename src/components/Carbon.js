import React, { useEffect } from 'react';

function CarbonAds() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//cdn.carbonads.com/carbon.js?serve=CEAIE2JY&placement=amanhimselfdev';
    script.id = '_carbonads_js';
    script.async = true;

    document.querySelectorAll('#carbon-container')[0].appendChild(script);
  }, []);

  return <div id="carbon-container"></div>;
}

export default CarbonAds;
