var timer;
var isScrolling = false;
var lastScroll = 0;
const hsWrapper = document.querySelector('.hs-wrapper');
const hsHorizontal = document.querySelector('.hs-horizontal');
const itemsLeft = [];

const calcDynamicLeft = () => {
  const items = hsHorizontal.querySelectorAll('.hs-item');
  Array.from( items ).forEach( ( item, index ) => {
    if ( index === 0 ){
      itemsLeft[0] = 0;
    }else{
      itemsLeft[index] = itemsLeft[ index - 1 ] + item.getBoundingClientRect().width;
    }
  } );
}

function calcDynamicHeight(ref) {
  const vw = ref.parentElement.getBoundingClientRect().width;
  const vh = window.innerHeight;
  const objectWidth = ref.scrollWidth;
  calcDynamicLeft();
  return objectWidth - vw + vh;
}

function getNearestValue ( offset, leftScollable, direction ){
  if ( offset >= leftScollable )
    return leftScollable;

  if ( direction > 0 ){
    //got to right
    for ( let i = 0; i < itemsLeft.length ; i++ ){
      if ( itemsLeft[i] >= offset && itemsLeft[i] <= leftScollable ){
        return itemsLeft[i];
      }
    }
  }else{
    //go to left
    for ( let i = itemsLeft.length - 1 ; i >= 0 ; i-- ){
      if ( itemsLeft[i] <= offset && itemsLeft[i] <= leftScollable ){
        return itemsLeft[i];
      }
    }
  }
  return leftScollable;
}

const scrollEnd = ( offset, leftScollable, sticky ) => {
  if ( isScrolling ) return;
  let stickyTop = sticky.getBoundingClientRect().top;
  if ( stickyTop === 0 ){
    isScrolling = true;
    let direction = offset - lastScroll;
    let nearestValue = getNearestValue( offset, leftScollable, direction );
    console.log( nearestValue );
    lastScroll = nearestValue;
    window.scrollTo( {
      top: window.pageYOffset - offset + nearestValue,
      behavior: 'smooth'
    } );
    setTimeout( () => { isScrolling = false; }, 300 );
  }else if ( stickyTop > 0 ){
    lastScroll = -1;
  }else {
    lastScroll = leftScollable + 100;
  }
}

window.addEventListener('scroll', () => {
  const sticky = document.querySelector('.hs-sticky');
  const offset = sticky.offsetTop;
  const leftScrollable = sticky.parentElement.getBoundingClientRect().height - sticky.getBoundingClientRect().height;
  hsHorizontal.style.transform = `translateX(-${offset}px)`;
  

  

});

window.addEventListener('resize', () => {
  hsWrapper.style.height = `${calcDynamicHeight(hsHorizontal)}px`;
});

hsWrapper.style.height = `${calcDynamicHeight(hsHorizontal)}px`;