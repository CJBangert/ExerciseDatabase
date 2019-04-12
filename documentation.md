
# Crowdsourced Exercises

---

Name: Charles Bangert

Date: 3/27/2019

Project Topic: Exercises

URL: https://exercise-database.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name                  `Type: String`
- `Field 2`: Duration              `Type: Number`
- `Field 3`: Muscle Groups         `Type: [String]`
- `Field 4`: Difficulty            `Type: Number`
- `Field 5`: Potential For Injury  `Type: Number`

Schema: 
```javascript
{
   name: String;
   duration: Number; 
   muscle_groups: [String];
   difficulty: Number;
   inj_potential: Number; 
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: "Bench Press";
        duration: 10;
        muscle_groups: ["chest","triceps"];
        difficulty: 6;
        inj_potential: 5; 
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error); 
  console.log(body);
});
```

### 3. View Data 

GET endpoint route: `/api/all`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Easier Beginner Exercises -> `/api/beg_exercises`
2. Most Difficult Exercise(s) -> `/api/most_diff`
3. Exercises with Higher Likelihood of Injury-> `/api/most_dangerous`
4. Arm Exercises -> `/api/cannons`
5. Quick, Hard Workouts -> `/api/quick`

