// console.log(InertiaPlugin)
// gsap.registerPlugin(InertiaPlugin)

let testimonalContent = [
  {
  content: 'Ali is an experienced designer. It is easy to get the preferred design from him as he listens to the requirements, and easily understands them. He also gives suggestions on how else something can be portrayed to be effective and catchy as well. Best about him is that he keeps improvising on his work until he’s satisfied.',
  name: 'Kanthika Somala',
  role: 'Founder at Basic ‘The Missed Part’',
  img: "<img class='img' src='./assets/img/testimonials/testimonials-1.jpg'>", 
  },
  { 
  content: 'As a colleague, Ali is an excellent person to work with. The passionate nature of his work ensures that everyone in the team has a voice and is able to contribute his ideas. He not only brought good ideas and knowledge but made everyone around him better in their jobs. I find these qualities very important in a UX designer.',
  name: 'Vamsi Pogakula',
  role: 'Software Test Engineer at Deloitte',
  img: "<img class='img' src='./assets/img/testimonials/testimonials-2.jpg'>", 
  },
  {
    content: 'Overall Ali takes up new challenges with ease, is always keen to help achieve company outcomes and to learn new things, and has a talent for creating an environment where everyone is comfortable. I am convinced he’ll achieve great success on his professional trajectory.',
    name: 'V S Kumar Raju',
    role: 'AGM - Human Resources',
    img: "<img class='img' src='./assets/img/testimonials/testimonials-3.jpg'>", 
  },
  {
    content: 'I have worked with Ali for around 2 years and I consider him to be a reliable and trustworthy colleague. A product visionary and UX UI specialist, he focuses on making sure that the product is crafted with the user in mind. I appreciate his excellent communication skills and his transparency.',
    name: 'Anant Kumar',
    role: 'Project Manager at nSpira',
    img: "<img class='img' src='./assets/img/testimonials/testimonials-4.jpg'>", 
    },
    {
      content: 'Ali is an experienced designer. It is easy to get the preferred design from him as he listens to the requirements, and easily understands them. He also gives suggestions on how else something can be portrayed to be effective and catchy as well. Best about him is that he keeps improvising on his work until he’s satisfied.',
      name: 'Kanthika Somala',
      role: 'Founder at Basic ‘The Missed Part’',
      img: "<img class='img' src='./assets/img/testimonials/testimonials-1.jpg'>", 
      },
      { 
      content: 'As a colleague, Ali is an excellent person to work with. The passionate nature of his work ensures that everyone in the team has a voice and is able to contribute his ideas. He not only brought good ideas and knowledge but made everyone around him better in their jobs. I find these qualities very important in a UX designer.',
      name: 'Vamsi Pogakula',
      role: 'Software Test Engineer at Deloitte',
      img: "<img class='img' src='./assets/img/testimonials/testimonials-2.jpg'>", 
      },
      {
        content: 'Overall Ali takes up new challenges with ease, is always keen to help achieve company outcomes and to learn new things, and has a talent for creating an environment where everyone is comfortable. I am convinced he’ll achieve great success on his professional trajectory.',
        name: 'V S Kumar Raju',
        role: 'AGM - Human Resources',
        img: "<img class='img' src='./assets/img/testimonials/testimonials-3.jpg'>", 
      },
      {
        content: 'I have worked with Ali for around 2 years and I consider him to be a reliable and trustworthy colleague. A product visionary and UX UI specialist, he focuses on making sure that the product is crafted with the user in mind. I appreciate his excellent communication skills and his transparency.',
        name: 'Anant Kumar',
        role: 'Project Manager at nSpira',
        img: "<img class='img' src='./assets/img/testimonials/testimonials-4.jpg'>", 
        },
  ]
  const testimonials  = testimonalContent.map(person => person)
  
  loadContent(testimonials);
  
  function loadContent(testimonials) {
    const buildTemplate = (template, data) => {
      for (const key in data) {
        const reg = new RegExp(`{${key}}`, "ig");
        template = template.replace(reg, data[key]);
      }
      return template;
    };
    const ChatBubble = function (data) {
      const elem = document.createElement("div");
      elem.classList.add("chat-bubble");
      elem.style.setProperty("--rotation", data.rotation + "deg");
      elem.innerHTML = buildTemplate(
        `
      <div class='chat-bubble-header'>
          <i class='fa fa-quote-left'></i>
        </div>
        <div class='content'>{content}</div>
        <div class='person'>
          <div class='img'>{img}</div>
          <div class='name'>{name}</div>
          <div class='role'>{role}</div>
        </div>
      `,
        data
      );
      setTimeout(() => {
        if (elem.children[2].scrollHeight > elem.children[2].clientHeight) {
          elem.classList.add("truncated");
        }
      }, 100);
      return elem;
    };
  
    const rotationAmt = 360 / testimonials.length;
    let focused = 0;
    const tElem = document.querySelector(".testimonial");
    const testimonialsElem = document.querySelector(".testimonials");
    const navElem = document.querySelector(".navigation");
    const dragElem = document.getElementById("dragelem");
  
    let paused = false;
    tElem.addEventListener("mouseenter", () => {
      paused = true;
      console.log(paused);
    });
  
    tElem.addEventListener("mouseleave", () => (paused = false));
  
    window.onblur = () => {
      paused = true;
      console.log(paused);
    };
    window.onfocus = () => {
      paused = false;
    };
  
    function getFocusedIndex() {
      return mod(focused, testimonials.length);
    }
  
    const radius = 400 / (2 * Math.sin(Math.PI / testimonials.length));
    const distToEdge = Math.round(Math.sqrt(radius ** 2 - 200 ** 2) + 30);
    testimonialsElem.style.setProperty("--distance", distToEdge + "px");
  
    testimonials.forEach((testimonial, i) => {
      testimonialsElem.appendChild(
        ChatBubble({
          ...testimonial,
          rotation: i * rotationAmt
        })
      );
  
      const navBtn = document.createElement("div");
      navBtn.classList.add("nav-dot");
      navBtn.addEventListener("click", () => {
        select(i);
      });
      navElem.appendChild(navBtn);
    });
  
    let xPos, dragStartPos;
    Draggable.create(tElem, {
      onDragStart: (e) => {
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos = dragStartPos = Math.round(e.clientX);
      },
  
      onDrag: (e) => {
        if (e.touches) e.clientX = e.touches[0].clientX;
  
        gsap.to(testimonialsElem, {
          rotationY: "+=" + ((Math.round(e.clientX) - xPos) % 360)
        });
  
        xPos = Math.round(e.clientX);
      },
  
      onDragEnd: () => {
        const currentRotation =
          gsap.getProperty(testimonialsElem, "rotationY") * -1;
        const index = mod(
          Math.round(currentRotation / rotationAmt),
          testimonials.length
        );
        console.log(xPos, dragStartPos);
        select(index, xPos < dragStartPos ? 1 : -1);
        gsap.set(tElem, { x: 0, y: 0 });
      }
    });
  
    let timeout;
    function update() {
      gsap.to(testimonialsElem, {
        rotationY: -focused * rotationAmt,
        duration: 1
      });
      const { children } = testimonialsElem;
      for (var i = 0; i < children.length; i++) {
        if (getFocusedIndex() === i) {
          children[i].classList.add("focused");
          navElem.children[i].classList.add("focused");
        } else {
          children[i].classList.remove("focused");
          navElem.children[i].classList.remove("focused");
        }
      }
      if (timeout) clearTimeout(timeout);
      const nextTimeout = (cb) => {
        timeout = setTimeout(() => {
          cb();
        }, 5000);
      };
      nextTimeout(() => {
        if (paused) {
          update();
        } else {
          focused++;
          update();
        }
      });
    }
    function mod(a, b) {
      return ((a % b) + b) % b;
    }
    function diff(a, b, c, d) {
      return d === -1 ? mod(b - a, c) : mod(a - b, c);
    }
    function select(index, dir) {
      index = mod(index, testimonials.length);
      // dir = null
  
      if (dir) {
        focused += diff(index, getFocusedIndex(), testimonials.length, dir) * dir;
      } else {
        focused += index - getFocusedIndex();
      }
      update();
    }
    update();
  
    document.querySelector(".arrow-right").addEventListener("click", () => {
      focused++;
      update();
    });
  
    document.querySelector(".arrow-left").addEventListener("click", () => {
      focused--;
      update();
    });
  }