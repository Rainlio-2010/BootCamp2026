def pascal_triangle(num) :
    triangle = []
    # 生成杨辉三角数列
    for n in range(num):
        row = [1 for m in range(n+1)]
        for p in range(1,n):
            row[p] = triangle[n-1][p-1] + triangle[n-1][p]
        triangle.append(row)

    # 生成合适的空格数
    for i in range(num):
        #数字间的空格
        strnum = ""
        for y in range(i+1):
            strnum += str(triangle[i][y])
            strnum += " "
        #数字前的空格
        spacect = ""
        for x in range(num - i - 1):
            spacect += " "
        print(spacect + strnum)
        

    # return triangle
    

pascal_triangle(6)