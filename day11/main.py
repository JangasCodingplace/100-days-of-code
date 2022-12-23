def print_christmas_tree(height):
  # Iterate through each row of the tree
  for i in range(1, height + 1):
    # Calculate the number of spaces to print before the stars
    spaces = height - i
    # Calculate the number of stars to print in each row
    stars = i * 2 - 1
    # Print the spaces and stars
    print(" " * spaces + "*" * stars)

# Test the function by printing a tree with a height of 5
print_christmas_tree(5)
