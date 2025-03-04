function iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }

  if(iOS())
  {
    alert("Hey! It looks like you are on an Iphone, some stuff might not work as expected. We recomend filling this form out on a Windows computer or an Android Phone.");
  }