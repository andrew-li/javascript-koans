var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {                   //find products that don't contain nuts
            hasMushrooms = false;                  
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {    //find products that don't contain mushrooms
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      //function that checks if ingredient is not a mushroom
      var ingredientIsNotAMushroom = function(ingredient) {
        return (ingredient !== "mushrooms");
      };

      //function that checks if product has no nuts and no mushrooms
      var productContainsNoNutsAndNoMushrooms = function(product) {
        return (product.containsNuts === false && _(product.ingredients).all(ingredientIsNotAMushroom));
      };

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(productContainsNoNutsAndNoMushrooms); 

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) { //add 3, 6, 9, 12, etc. and 5, 10, 15, 20, etc. to sum
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1, 1000).reduce(function(total, currentNumber) {
      return ( (currentNumber % 3 === 0 || currentNumber % 5 === 0) ? (total + currentNumber) : total );
    }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {  //calculate count of every ingredient in products array
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1; 
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    //function that returns all of the product's ingredients as an array
    var getProductIngredients = function(product) {
      return product.ingredients;
    };

    //function that increments the passed in object's ingredient counters based on passed in ingredient name
    var countIngredients = function(ingredientCount, currentIngredient) {
      if(ingredientCount[currentIngredient] === undefined)
      {
        ingredientCount[currentIngredient] = 1;
      }
      else
      {
        ++ingredientCount[currentIngredient];
      }

      return ingredientCount;
    };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _(products).chain().map(getProductIngredients).flatten().reduce(countIngredients, {}).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    //returns -1 if number is not a composite number
    var findLargestPrimeFactor = function(compositeNumber)
    {
      if(compositeNumber <= 2)
        return -1;

      //keep dividing the current number by all numbers less than it that haven't been checked yet 
      var largestPrimeFactor = compositeNumber;
      var i = 2;
      while(largestPrimeFactor > i)
      {
        //the first division gives the largest factor; when it can't be divided into anymore then it will be the largest prime factor
        if(largestPrimeFactor % i === 0)
        {
          largestPrimeFactor /= i;
        }
        else
        {
          ++i;
        }
      }
      return (largestPrimeFactor >= compositeNumber) ? -1 : largestPrimeFactor;
    };

    expect(findLargestPrimeFactor(1)).toBe(-1); //not composite number
    expect(findLargestPrimeFactor(2)).toBe(-1); //not composite number
    expect(findLargestPrimeFactor(7)).toBe(-1); //not composite number
    expect(findLargestPrimeFactor(179)).toBe(-1); //not composite number
    expect(findLargestPrimeFactor(64)).toBe(2);
    expect(findLargestPrimeFactor(75)).toBe(5);
    expect(findLargestPrimeFactor(120)).toBe(5);
    expect(findLargestPrimeFactor(125)).toBe(5);
    expect(findLargestPrimeFactor(358)).toBe(179);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //helper function that checks if number is a palindrome
    var isPalindromicNumber = function(number)
    {
      //convert passed in number to string type then compare the original numeric string to its reverse
      //if the original numeric string is equal to its reverse, then it is a palindrome
      var numberAsString = number.toString();
      return (numberAsString == numberAsString.split("").reverse().join(""));
    };

    var findLargestPalindrome = function() {
      var product = 0;
      var largestPalindrome = 0;
      for(var i = 999; i >= 100; --i) //999 to 100 represents all 3 digit numbers
      {
        for(var j = i; j >= 100; --j) //can start at i since j * i doesn't need to be checked because i * j and j * i is the same
        {
          product = i * j;
          if(isPalindromicNumber(product) && product > largestPalindrome) //store largest product that is a palindrome
          {
            largestPalindrome = product;
          }
        }
      }
      return largestPalindrome;
    };

    expect(findLargestPalindrome()).toBe(906609);
  });
  
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {  
    //helper function that finds the greatest common divisor between two numbers 
    var gcd = function(num1, num2) {
      if(num1 === num2 || num2 === 0)
      {
        return num1;
      }
      else if (num1 === 0) 
      {
        return num2;
      }
      else
      {
        //to get the gcd, keep getting the gcd between the current and previous remainders until 0
        return gcd(num2, num1 % num2); 
      }
    };

    //helper function that finds the least common multiple between two numbers 
    var lcm = function(num1, num2) {
      if(num1 === num2)
      {
        return num1;
      }
      else if (num1 === 0 || num2 === 0) 
      {
        return 0;
      }
      else
      {
        return ((num1 * num2) / gcd(num1, num2)); //multiply the two numbers and divide by the gcd to get the lcm
      }
    };

    var findLCMofOneToN = function(n) {
      if(n < 1)
        return 0;

      //can get the lcm of 1 to N by getting the lcm between the current number and the lcm of all previous numbers for every number in 1 to N
      var currentLCM = 1;
      for(var i = 2; i <= n; ++i)
      {
        currentLCM = lcm(currentLCM, i);
      }
      return currentLCM;
    };
    
    expect(findLCMofOneToN(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    //helper function that calculates sum of squares for array input by looping through the array
    var sumOfSquaresForArrayInput = function(arr) {
      return (arr.reduce(
        function(sum, i) {
          return sum + Math.pow(i, 2);
        }, 0));
    };

    //helper function that calculates sum of squares for array input by looping through the array
    var squareOfTheSumsForArrayInput = function(arr) {
      return (Math.pow(
        arr.reduce(
          function(sum, i) {
            return sum + i;
          }, 0),
        2));
    };

    //calculates the difference between the sum of the squares and the square of the sums for array input by looping through the array
    var differenceForArrayInput = function(arr) {
      return Math.abs(sumOfSquaresForArrayInput(arr) - squareOfTheSumsForArrayInput(arr));
    };

    expect(differenceForArrayInput(_.range(1, 21))).toBe(41230);

    //helper function that calculates sum of squares for first n numbers by using formula found here: 
    //http://www.trans4mind.com/personal_development/mathematics/series/sumNaturalSquares.htm
    var sumOfSquaresForFirstNnumbers = function(n) {
      return ((n * (n + 1) * (2 * n + 1)) / 6);
    };

    //helper function that calculates square of sums for first n numbers by using formula found here: 
    //http://www.mathwords.com/a/arithmetic_series.htm
    var squareOfTheSumsForFirstNnumbers = function(n) {
      return Math.pow((n * (n + 1)) / 2, 2);
    };

    //calculates the difference between the sum of the squares and the square of the sums for first n numbers by using math formulas
    var differenceForFirstNnumbers = function(n) {
      return Math.abs(sumOfSquaresForFirstNnumbers(n) - squareOfTheSumsForFirstNnumbers(n));
    };
    
    expect(differenceForFirstNnumbers(20)).toBe(41230);
    expect(differenceForArrayInput(_.range(1, 31))).toBe(differenceForFirstNnumbers(30));
  });

  it("should find the 10001st prime", function () {
    //helper function that loops through multiples of i in the passed in array; every multiple marked is not a prime number
    var markCompositeNumbers = function(compositeNumberCheckArray, i, maxNumber) {
      for(var j = i * i ; j < maxNumber; j += i) //can start at i ^ 2 since every composite number up to i ^ 2 will have already been marked 
      {
        compositeNumberCheckArray[j - 2] = true; //start array index at 0, so the number 2 is actually represented by index 0
      }
    };

    var findNthPrime = function(n) {
      if(n < 1)
        return 0;

      //max number is a value that shouldn't be changed; it represents approximately how many numbers need to be searched to find the nth prime
      //the formula for how many numbers need to be searched uses a rough approximation formula found here:
      //http://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number
      var MAX_NUMBER = (n <= 6) ? 14 : (Math.ceil(n * (Math.log(n) + Math.log(Math.log(n)))));

      //to find the nth prime number, need to count number of primes found
      //a boolean array will be used to indicate if a number is prime or not prime (true = not prime), with the index representing a number
      //since anything that is a multiple of a number is not a prime, can find all nonprimes by finding multiples of primes
      var compositeNumberCheckArray = new Array(MAX_NUMBER);
      var primesFoundCounter = 0;
      for(var i = 2; i < MAX_NUMBER; ++i)
      {
        //skip numbers that aren't prime
        if(compositeNumberCheckArray[i - 2] === true) //start array index at 0, so the number 2 is actually represented by index 0
          continue;

        ++primesFoundCounter; //increment number of primes found

        if(primesFoundCounter === n)
          return i; //i is the nth prime number

        markCompositeNumbers(compositeNumberCheckArray, i, MAX_NUMBER); //mark all multiples of the current prime number as nonprime
      }

      return 0; //should not get here
    };

    expect(findNthPrime(1001)).toBe(7927); 
  });
});