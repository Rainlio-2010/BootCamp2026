from flask import Flask, jsonify, request
from flask_cors import CORS
import random


app = Flask(__name__)
CORS(app)

board = []
def new_game():
    global board

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    add2number()
    add2number()


def add2number():

    empty = []

    for r in range(4):
        for c in range(4):

            if board[r][c] == 0:

                position = (r, c)
                empty.append(position)

    if len(empty) > 0:

        position = random.choice(empty)

        row = position[0]
        col = position[1]

        board[row][col] = 2





def move_row(row):
    row=[
        x for x in row
        if x!=0
    ]
    result=[]
    i=0

    while i<len(row):
        if i+1<len(row) and row[i]==row[i+1]:
            result.append(row[i]*2)
            i+=2
        else:
            result.append(row[i])
            i+=1


    while len(result)<4:

        result.append(0)



    return result





def move_left():


    changed=False


    for r in range(4):

        old=board[r][:]


        board[r]=move_row(board[r])


        if old!=board[r]:

            changed=True



    return changed





def rotate():

    global board


    board=[
        list(x)
        for x in zip(*board[::-1])
    ]




def move(direction):


    changed=False


    if direction=="left":

        changed=move_left()



    elif direction=="right":

        rotate()
        rotate()

        changed=move_left()

        rotate()
        rotate()



    elif direction=="up":

        rotate()
        rotate()
        rotate()

        changed=move_left()

        rotate()



    elif direction=="down":

        rotate()

        changed=move_left()

        rotate()
        rotate()
        rotate()



    if changed:

        add2number()



new_game()



# =====================
# API
# =====================


@app.route("/")
def get_board():

    return jsonify(board)



@app.route("/move",methods=["POST"])
def move_api():


    data=request.json

    direction=data["direction"]


    move(direction)


    return jsonify(board)



@app.route("/reset")
def reset():

    new_game()

    return jsonify(board)



app.run(debug=True)