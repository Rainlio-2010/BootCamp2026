n = int(input("Enter the size: "))

matrix = []

for i in range(n):
    matrix.append([0] * n)

top = 0
bottom = n - 1
left = 0
right = n - 1

num = 1

while top <= bottom and left <= right:
    for col in range(left, right + 1):
        matrix[top][col] = num
        num = num + 1
    top = top +1

    for row in range(top, bottom + 1):
        matrix[row][right] = num
        num = num +  1
    right = right - 1

    for coln in range(right, left - 1, -1):
            matrix[bottom][coln] = num
            num =num + 1
    bottom = bottom - 1


    for row in range(bottom, top - 1, -1):
            matrix[row][left] = num
            num = num + 1
    left = left+ 1


for row in matrix:
    for value in row:
        print(f"{value:3}", end="")
    print()