Sprint Rep Time Calculator
A web-based training tool for track and field coaches and athletes to estimate optimal sprint rep times based on individual performance data. Using power-law regression analysis, this calculator provides personalized time predictions for custom distances and intensity levels.

Features
Personalized Sprint Predictions: Estimates sprint rep times for any distance based on known sprint times

Power-Law Regression Model: Fits a mathematical curve to athlete data for accurate extrapolation

Intensity Adjustment: Calculates rep times at specific effort levels (e.g., 85% intensity)

Minimal Data Requirements: Works with just 2+ known sprint times

Clean, User-Friendly Interface: Simple input fields and immediate results

Educational Value: Transparent explanation of the mathematical model used

How It Works
The Math Behind It
The calculator uses log-log linear regression to model sprint performance across distances. The underlying model is a power-law relationship:

text
T(D) = A × D^c
Where:

T(D) = predicted time for distance D (meters)

D = target distance

A = speed coefficient (derived from input data)

c = fatigue exponent (how performance decays over distance)

The Process
Data Input: Enter known sprint times for any distances (60m, 100m, 200m, 300m, 400m, 800m)

Log Transformation: Convert distances and times to logarithmic scale

Linear Regression: Calculate the best-fit line in log-log space

Prediction: Use the fitted model to estimate rep time at target distance

Intensity Scaling: Adjust full-effort time by the specified intensity percentage

Intensity Adjustment Formula:

text
Adjusted Time = Full Effort Time / (Intensity ÷ 100)
For example, a 12-second full-effort 300m at 85% intensity becomes: 12 / 0.85 ≈ 14.1 seconds

Installation & Setup
Prerequisites
A modern web browser (Chrome, Firefox, Safari, Edge)
