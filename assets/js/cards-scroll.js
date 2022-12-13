const rows = document.querySelectorAll(".wrapper__row");


const infinityScrollCarousel = (rowsArray, cardsSelector) => {
  rowsArray.forEach(row => {
    const cardsInnerRow = row.querySelectorAll(`${cardsSelector}`);
    const cardsLength = cardsInnerRow.length;

    cardsInnerRow.forEach(scrollcard => {
      const cardWidth = scrollcard.offsetWidth;
      const rowWidth = cardsLength * cardWidth;

      row.style.width = rowWidth + "px";

      gsap.set(cardsInnerRow, {
        xPercent: -100,
        x: i => i * cardWidth });


      gsap.to(cardsInnerRow, {
        duration: 50,
        ease: "none",
        x: "+=" + rowWidth,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % rowWidth) },

        repeat: -1 });


      if (scrollcard.closest(".rowReverse")) {
        gsap.set(cardsInnerRow, {
          xPercent: 0,
          x: i => i * -cardWidth });


        gsap.to(cardsInnerRow, {
          duration: 50,
          ease: "none",
          x: "-=" + rowWidth,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % rowWidth) },

          repeat: -1 });

      }
    });
  });
};

infinityScrollCarousel(rows, ".wrapper__rowItem");