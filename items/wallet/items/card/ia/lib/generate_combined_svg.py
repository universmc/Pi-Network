# generate_combined_svg.py

import svgwrite
import numpy as np

def generate_sigmoid(diameter, weight):
    x = np.linspace(-diameter / 2, diameter / 2, 100)
    y = 1 / (1 + np.exp(-weight * x))
    return x, y
def generate_svg(diameter, weight, tensor):
    dwg = svgwrite.Drawing('combined.svg', profile='tiny')

    # Draw the sigmoid curve
    x_sigmoid, y_sigmoid = generate_sigmoid(diameter, weight)
    dwg.add(dwg.polyline(list(zip(x_sigmoid, y_sigmoid)), stroke=svgwrite.rgb(0, 0, 0, '%')))
    
    # Example: Draw a rectangle for each element in the tensor
    for i, row in enumerate(tensor):
        for j, value in enumerate(row):
            rect_x = j * 20  # Adjust as needed
            rect_y = 100 + i * 20  # Adjust as needed
            # Use rect_x and rect_y within this loop
            dwg.add(dwg.rect((rect_x, rect_y), (15, 15), fill=f'rgb({int(value * 255)}, {int(value * 255)}, {int(value * 255)})'))

    dwg.save()

def main():
    diameter = 100
    weight = 0.1
    tensor = np.random.rand(3, 3)  # Placeholder tensor, replace with your actual tensor

    generate_svg(diameter, weight, tensor)

if __name__ == "__main__":
    main()

