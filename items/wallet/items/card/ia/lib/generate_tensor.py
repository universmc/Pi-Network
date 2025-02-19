# generate_tensor.py

def generate_svg(tensor):
    svg_content = """
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <!-- Your SVG content here -->
    </svg>
    """
    return svg_content

def generate_tensor():
    tensor = [
        [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        [[10, 11, 12], [13, 14, 15], [16, 17, 18]],
        [[19, 20, 21], [22, 23, 24], [25, 26, 27]]
    ]
    return tensor

def main():
    tensor = generate_tensor()
    svg_content = generate_svg(tensor)

    with open("tensor.svg", "w") as svg_file:
        svg_file.write(svg_content)

if __name__ == "__main__":
    main()

