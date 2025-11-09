# Sprint Rep Time Calculator

A web-based training tool for track and field coaches and athletes to estimate optimal sprint rep times based on individual performance data. Using power-law regression analysis, this calculator provides personalized time predictions for custom distances and intensity levels.

## Features

- **Personalized Sprint Predictions**: Estimates sprint rep times for any distance based on known sprint times
- **Power-Law Regression Model**: Fits a mathematical curve to athlete data for accurate extrapolation
- **Intensity Adjustment**: Calculates rep times at specific effort levels (e.g., 85% intensity)
- **Minimal Data Requirements**: Works with just 2+ known sprint times
- **Clean, User-Friendly Interface**: Simple input fields and immediate results
- **Educational Value**: Transparent explanation of the mathematical model used

## How It Works

### The Math Behind It

The calculator uses **log-log linear regression** to model sprint performance across distances. The underlying model is a power-law relationship:

```
T(D) = A × D^c
```

Where:
- **T(D)** = predicted time for distance D (meters)
- **D** = target distance
- **A** = speed coefficient (derived from input data)
- **c** = fatigue exponent (how performance decays over distance)

### The Process

1. **Data Input**: Enter known sprint times for any distances (60m, 100m, 200m, 300m, 400m, 800m)
2. **Log Transformation**: Convert distances and times to logarithmic scale
3. **Linear Regression**: Calculate the best-fit line in log-log space
4. **Prediction**: Use the fitted model to estimate rep time at target distance
5. **Intensity Scaling**: Adjust full-effort time by the specified intensity percentage

**Intensity Adjustment Formula:**
```
Adjusted Time = Full Effort Time / (Intensity ÷ 100)
```

For example, a 12-second full-effort 300m at 85% intensity becomes: 12 / 0.85 ≈ 14.1 seconds

## Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or additional dependencies required

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sprint-rep-time-calculator.git
cd sprint-rep-time-calculator
```

2. Open `index.html` in your web browser:
```bash
open index.html  # macOS
# or
start index.html  # Windows
# or right-click and select "Open with Browser"
```

That's it! The application runs entirely on the client side.

## Usage

### For Coaches & Athletes

1. **Enter Rep Distance**: Input the target sprint distance in meters (e.g., 300)
2. **Enter Intensity**: Specify the desired intensity as a percentage (e.g., 85 for 85%)
3. **Enter Known Times**: Input any sprint times you have on record:
   - 60m time
   - 100m time
   - 200m time
   - 300m time
   - 400m time
   - 800m time
   - (Minimum 2 required for calculation)
4. **Click "Calculate Rep Time"**: The tool will estimate the rep time

### Example Scenario

An athlete with the following sprint times:
- 100m: 11.5 seconds
- 200m: 23.8 seconds
- 400m: 50.2 seconds

To estimate their 300m time at 90% intensity:
1. Enter 300 for rep distance
2. Enter 90 for intensity
3. Enter the three known times
4. Click Calculate → Result: ~35.2 seconds

## Project Structure

```
sprint-rep-time-calculator/
├── index.html       # Main HTML structure and styling
├── script.js        # JavaScript logic and regression calculations
├── README.md        # This file
└── LICENSE          # Project license (if applicable)
```

## Technical Details

### Why Power-Law Regression?

Sprint performance across different distances follows a power-law distribution, not a linear one. This is because:
- Aerobic capacity becomes more important at longer distances
- Anaerobic power dominates at shorter distances
- The relationship is non-linear due to biomechanical factors

Power-law regression captures these dynamics better than polynomial or linear fits, making predictions more accurate across the entire speed-distance spectrum.

### Regression Implementation

The calculator performs least-squares linear regression in log-log space:

```javascript
// Transform to log scale
logDistances = input distances → log(distances)
logTimes = input times → log(times)

// Fit line: log(T) = log(A) + c × log(D)
c = (n × Σ(logD × logT) - Σ(logD) × Σ(logT)) / (n × Σ(logD²) - (Σ(logD))²)
A = exp((Σ(logT) - c × Σ(logD)) / n)

// Predict
predictedTime = A × distance^c
```

### Accuracy Considerations

- **Minimum 2 data points** required; more data points improve model reliability
- **Outliers**: Exceptional performances at specific distances may skew predictions
- **Best use**: Estimating distances within or near your known data range
- **Extrapolation**: Predictions far outside known distances are less reliable

## Code Architecture

### HTML (`index.html`)
- Semantic structure with clear sections
- Responsive design suitable for desktop and tablet use
- Integrated CSS for styling

### JavaScript (`script.js`)
- `calculateRepTime()`: Main function orchestrating the workflow
- Input validation and error handling
- Log-log regression calculations
- Result display and formatting

## Limitations & Future Improvements

### Current Limitations
- Client-side only (no data persistence or history)
- Limited to simple power-law model (assumes consistent fatigue patterns)
- No visualization of the fitted curve or confidence intervals
- No support for team data management

### Potential Enhancements
- **Visualization**: Display the regression curve with data points
- **Confidence Intervals**: Show prediction uncertainty
- **Historical Tracking**: Store athlete data and track progress over time
- **Curve Comparison**: Compare predicted vs. actual performance across athletes
- **Downloadable Reports**: Export training recommendations as PDF
- **Mobile App**: Native iOS/Android application
- **Advanced Models**: Support for multi-factor models (altitude, temperature, etc.)

## Use Cases

- **Workout Planning**: Coaches can prescribe accurate rep times based on athlete ability
- **Performance Benchmarking**: Compare predicted times to establish baseline standards
- **Training Progression**: Track improvements by recalculating as athletes improve
- **Athlete Onboarding**: New coaching staff can estimate times without full athlete history
- **Educational Tool**: Learn about regression analysis and sports science modeling

## Contributing

This project was developed as a student assignment. If you find bugs, have suggestions, or want to contribute improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Test thoroughly in multiple browsers
5. Submit a pull request with a clear description of your changes

## Author

Created as a student project demonstrating applied mathematics, web development, and sports science principles.
For questions about how the calculator works or suggestions for improvement, feel free to open an issue on this repository.

---

**Note**: This tool is designed to aid training planning but should be used alongside professional coaching judgment and athlete feedback. Always prioritize athlete safety and individual response to training stimuli.
