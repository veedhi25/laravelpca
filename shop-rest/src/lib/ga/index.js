// log the pageview with their URL

export const pageview = (url) => {
  if (typeof windowv!== 'undefined'){
    window.gtag('config', 'UA-190495171-1', {
      page_path: url,
    })
  }
  }
  
  // log specific events happening.
  export const event = ({ action, params }) => {
    window.gtag('event', action, params)
  }
  