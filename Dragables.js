class Dragables {
  constructor(items) {
    this.over = null;
    this.objs = this.setItems(items);
  }

  setItems(items) {
    let l = items.map((i, ind) => {
      return {
        id: ind,
        el: i,
        pos1: 0,
        pos2: 0,
        pos3: 0,
        pos4: 0,
        origin: { x: i.offsetLeft, y: i.offsetTop }
      };
    });

    l.forEach((it) => {
      if (document.getElementById(it.el.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(it.el.id + "header").onmousedown = (e) =>
          this.dragMouseDown(e, it);
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        it.el.onmousedown = (e) => this.dragMouseDown(e, it);
      }
    });
    return l;
  }
  //start dragging
  dragMouseDown(e, item) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    item.pos3 = e.clientX;
    item.pos4 = e.clientY;
    item.el.style.transition = "";
    item.el.children[0].style.backgroundColor = "#FF0000";
    item.el.style.zIndex = 10;
    document.onmouseup = (e) => this.closeDragElement(e, item);
    // call a function whenever the cursor moves:
    document.onmousemove = (e) => this.elementDrag(e, item);
  }

  //onHold
  elementDrag(e, item) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    item.pos1 = item.pos3 - e.clientX;
    item.pos2 = item.pos4 - e.clientY;
    item.pos3 = e.clientX;
    item.pos4 = e.clientY;
    // set the element's new position:
    this.isOver(e, item);
    item.el.style.top = item.el.offsetTop - item.pos2 + "px";
    item.el.style.left = item.el.offsetLeft - item.pos1 + "px";
  }

  //onStop
  closeDragElement(e, item) {
    item.el.children[0].style.backgroundColor = "#2196f3";
    // e = e || window.event;

    let c = this.check(e, item);

    if (!c) {
      item.el.style.top = item.origin.y + "px";
      item.el.style.left = item.origin.x + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
    item.el.style.zIndex = 1;
  }

  check(e, item) {
    console.log("e, el", e, item);

    let x = e.clientX;
    let y = e.clientY;
    let check = false;
    console.log("this.objs", this.objs);

    this.objs.forEach((elmnt) => {
      if (elmnt.el.id !== item.el.id) {
        let t = elmnt.el.offsetTop;
        let l = elmnt.el.offsetLeft;
        let h = elmnt.el.offsetHeight + t;
        let w = elmnt.el.offsetWidth + l;

        if (t < y && y < h && l < x && x < w) {
          item.el.style.top = elmnt.origin.y + "px";
          item.el.style.left = elmnt.origin.x + "px";
          elmnt.el.style.transition = " all 500ms ease";
          elmnt.el.style.top = item.origin.y + "px";
          elmnt.el.style.left = item.origin.x + "px";
          this.swapOrigins(item, elmnt);
          // elmnt.el.style.transition = "";
          check = true;
        }
      }
    });
    return check;
  }

  swapOrigins(one, two) {
    let orgTemp = one.origin;
    one.origin = two.origin;
    two.origin = orgTemp;

    // this.objs = this.objs.map((obj) => {
    //   if (obj.id === one.id) {
    //     return one;
    //   } else if (obj.id === two.id) {
    //     return two;
    //   }
    //   return obj;
    // });
  }

  isOver(e, item) {
    let x = e.clientX;
    let y = e.clientY;
    this.objs.forEach((elmnt) => {
      if (elmnt.el.id !== item.el.id) {
        let t = elmnt.el.offsetTop;
        let l = elmnt.el.offsetLeft;
        let h = elmnt.el.offsetHeight + t;
        let w = elmnt.el.offsetWidth + l;

        console.log("this.over");

        if (
          !elmnt.el.classList.contains("noOver") &&
          t < y &&
          y < h &&
          l < x &&
          x < w
        ) {
          console.log("is over,", elmnt.id);
          this.over = elmnt.id;
          elmnt.el.style.transition = " all 500ms ease";
          elmnt.el.classList.add("noOver");
          elmnt.el.style.top = item.origin.y + "px";
          elmnt.el.style.left = item.origin.x + "px";
          this.swapOrigins(item, elmnt);
          setTimeout(() => {
            elmnt.el.classList.remove("noOver");
          }, 500);
        } else {
          this.over = null;
        }
      }
    });
  }
}
