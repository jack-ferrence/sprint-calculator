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

  if (inputs.length < 2) {
    document.getElementById("result").innerText = "Please enter at least two known times to run regression.";
    return;
  }

  // Check for exact match
  const exactMatch = inputs.find(input => input.distance === repDistance);
  if (exactMatch) {
    const estTime = exactMatch.time / intensity;
    document.getElementById("result").innerText = `Estimated time: ${estTime.toFixed(2)} seconds`;
    return;
  }

  // Perform log-log linear regression
  const logDistances = inputs.map(pt => Math.log(pt.distance));
  const logTimes = inputs.map(pt => Math.log(pt.time));

  const n = inputs.length;
  const sumX = logDistances.reduce((a, b) => a + b, 0);
  const sumY = logTimes.reduce((a, b) => a + b, 0);
  const sumXY = logDistances.reduce((sum, x, i) => sum + x * logTimes[i], 0);
  const sumXX = logDistances.reduce((sum, x) => sum + x * x, 0);

  const c = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const lnA = (sumY - c * sumX) / n;
  const A = Math.exp(lnA);

  const fullEffortTime = A * Math.pow(repDistance, c);
  const adjustedTime = fullEffortTime / intensity;

  document.getElementById("result").innerText = `Estimated time: ${adjustedTime.toFixed(2)} seconds`;
}