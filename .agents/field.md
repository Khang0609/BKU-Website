# FIELDS

## Training Point

- Semester

- Number of points ( save as Points )

- Rating

- Last updated at

## Extra-cirricular

- Cirricular ID

- Cirricular name

- Address ( text )

- Day start

- Number of day to excute ( social work day )

- Number of social work day exchange

- Have proof ( boolean )

- Is vertificate ( boolean )

- State ( enum: END, PERPARED )

*Database for extra-cirricular:*

- We don't really save all of these field into student extra-cirricular table. We will split them down two tables:
    - One called extra-cirriculars save cirricular ID (string), name, address (string), day start, number of dat to excute, have proof, state
    - One called student extra-cirriculars, take primary ID of extra-cirriculars table as foreign key, Number of social work day exchange ( save in student database ) will be update automatically as the number of day to execute if is vertification is true ( save in student database )
