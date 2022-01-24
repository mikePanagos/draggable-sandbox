<!DOCTYPE html>
<html>
  <link rel="stylesheet" href="./style.css"></style>
  <body>
    <h1>Draggable DIV Element</h1>

    <p>Click and hold the mouse button down while moving the DIV element</p>

    <div id="mydiv">
      <div id="mydivheader"  class="mydivheader">Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV</p>
    </div>

    <div id="mydiv2">
      <div id="mydiv2header" class="mydivheader">Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV 2</p>
    </div>
    <div id="mydiv3">
      <div id="mydiv3header"  class="mydivheader">Click here to move</div>
      <p>Move</p>
      <p>this</p>
      <p>DIV 3</p>
    </div>
    <script type="text/javascript" src="./Dragables.js"></script>

    <script>
      //Make the DIV element draggagle:

      let els = [
        document.getElementById("mydiv"),
        document.getElementById("mydiv2"),
        document.getElementById("mydiv3")
      ];
      let distance = 175;

      els[1].style.left = distance + "px";
      console.log("els[1].style.left", els[1].style.left);

      els[2].style.left = distance * 2 + "px";

      new Dragables(els);
    </script>
  </body>
</html>
