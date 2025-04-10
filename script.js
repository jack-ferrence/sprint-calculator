function calculateRepTime() {
  const repDistance = parseFloat(document.getElementById("repDistance").value);
  let intensity = parseFloat(document.getElementById("intensity").value);

  if (isNaN(repDistance) || isNaN(intensity) || intensity <= 0 || intensity > 100) {
    document.getElementById("result").innerText = "Please enter a valid rep distance and intensity (1–100%).";
    return;
  }

  intensity = intensity / 100;

  const knownDistances = [60, 100, 200, 300, 400, 800];
  const inputs = knownDistances.map(d => {
    const value = parseFloat(document.getElementById(`t${d}`).value);
    return isNaN(value) ? null : { distance: d, time: value };
  }).filter(Boolean);

  if (inputs.length < 1) {
    document.getElementById("result").innerText = "Please enter at least one known time.";
    return;
  }

  // Pick the known point closest to the target distance
  inputs.sort((a, b) => Math.abs(a.distance - repDistance) - Math.abs(b.distance - repDistance));
  const { distance: d, time: t } = inputs[0];

  const v = d / t; // average speed
  const c = v * Math.pow(d, 0.5); // constant used for extrapolation

  const estTime = (repDistance / (c / Math.pow(repDistance, 0.5))) / intensity;
  const roundedTime = estTime.toFixed(2);

  document.getElementById("result").innerText = `Estimated time: ${roundedTime} seconds`;
}