num_line = int(input("Enter the number of lines: "))

def triangle(num_line):
    og_list = [1]
    for a in range(num_line):
        for c in range (num_line-a):
            print(" ", end = "")
        for b in range (len(og_list)):
            print(og_list[b], end = "")
            print(" ", end ="")
        print()
        if len(og_list) == 1 :
            og_list.append(1)
        else:
            z = 0
            new_list = [1]
            for d in range(len(og_list) - 1):
                
            
                new_add = og_list[z] + og_list[z+1]
                
                new_list.append(new_add)
                z = z+1
            
            new_list.append(1)
            og_list = new_list




triangle(num_line) 