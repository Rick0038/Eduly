# To follow the best and clean codeing pratices kindly follow these guidelines at the time of writing the code.

### Variable Naming Conventions

Variable naming is an important aspect in making your code readable. Naming variables follow a simple idea: Create variables that describe their function and which follow a consistent theme throughout your code. Let’s take a look at some naming conventions.

***Snakecase***: _Words are delimited by an underscore._

>variable_one\
>variable_two



### Function and Class Naming conventions

Much like variable naming conventions, functions and classes should also follow a similar structure of descriptive titles delimited with the conventions described.

- Functions\
***Camelcase***: _Words are delimited by capital letters, except the initial word._

  >functOne\
  >functTwo

- Classes\
***Camelcase***: _Words are delimited by capital letters, except the initial word._

  >classOne\
  >classTwo

- Constant\
***Uppercase:*** _Words are written with capital letters and are delimited by an underscore._

  >CONSTONE\
  >CONSTTWO

### Whitespace and Tabbing

Whitespace and tabbing are critical for organizing code. Whitespace is any space in your code that is not taken up by physical characters. While some languages ignore whitespace and tabbing all together, others entirely rely on the concept. Tabbing is one way to create whitespace in consistent units using the ‘tab’ key. Kindly use 'tab' to indicate whitespace. Example is provided later on this document.

### Commenting your code

Commenting may be the most important way to organize and segment code. Comments are sections of code that the compiler ignores, which are useful to label code and segment code. For example, one can label loops, scopes, functions, and other code snippets with the expected function of the code. Kindly use comments before the code.


### Example
```C
#include <stdio.h>
#include <vector>

using namespace std;

int main(int argc, char** argv){
    //Declare a vector to store values
    vector<int> multiples;

    //Iterate from 0 to 50
    for(int i = 0; i <= 50; i++){

        //If iterator is a multiple of 5 add it to the vector
        if(i % 5 == 0){
            multiples.push_back(i);
        }
    }

    //Print all items that are a multiple of 5
    for(int i; i < multiples.size(); i++){
        printf("%d is a multiple of 5\n", multiples[i]);
    }
    return 0;
}```
