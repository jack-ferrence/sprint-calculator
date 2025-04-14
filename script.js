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

  // Check for exact match
  const exactMatch = inputs.find(input => input.distance === repDistance);
  if (exactMatch) {
    const estTime = exactMatch.time / intensity;
    document.getElementById("result").innerText = `Estimated time: ${estTime.toFixed(2)} seconds`;
    return;
  }

  // Sort inputs by distance
  inputs.sort((a, b) => a.distance - b.distance);

  // Find two known distances surrounding the target distance
  let lower = null;
  let upper = null;
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[i].distance < repDistance && inputs[i + 1].distance > repDistance) {
      lower = inputs[i];
      upper = inputs[i + 1];
      break;
    }
  }

  if (!lower || !upper) {
    // If interpolation isn't possible, fallback to closest known distance
    const closest = inputs.reduce((prev, curr) =>
      Math.abs(curr.distance - repDistance) < Math.abs(prev.distance - repDistance) ? curr : prev
    );
    const v = closest.distance / closest.time;
    const c = v * Math.sqrt(closest.distance);
    const estTime = (repDistance / (c / Math.sqrt(repDistance))) / intensity;
    document.getElementById("result").innerText = `Estimated time: ${estTime.toFixed(2)} seconds`;
    return;
  }

  // Interpolate c values
  const v1 = lower.distance / lower.time;
  const c1 = v1 * Math.sqrt(lower.distance);
  const v2 = upper.distance / upper.time;
  const c2 = v2 * Math.sqrt(upper.distance);

  const weight = (repDistance - lower.distance) / (upper.distance - lower.distance);
  const c = c1 + (c2 - c1) * weight;

  const estTime = (repDistance / (c / Math.sqrt(repDistance))) / intensity;
  document.getElementById("result").innerText = `Estimated time: ${estTime.toFixed(2)} seconds`;
}
