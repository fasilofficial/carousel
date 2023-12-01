const track = document.getElementById("image-track");

const handleMouseDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleMouseMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    // image.style.objectPosition = ;
    image.animate(
      {
        objectPosition: `${nextPercentage + 100}% 50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

const handleMouseUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousedown = (e) => {
  handleMouseDown(e);
};

window.onmousemove = (e) => {
  handleMouseMove(e);
};

window.onmouseup = () => {
  handleMouseUp();
};
