var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./dataUtil.js");

var app = express();
/*var hbs = exphbs.create({
  helpers: {
    jsonifyier: function(obj) {return new exphbs.SafeString(JSON.stringify(obj));}
  }
});*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var _ = require("underscore");
dataUtil.restoreOriginalData();
var _DATA = dataUtil.loadData().exercises
/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */ 





app.get('/',function(req,res){
	 console.log("Going home...")
    res.render('home', {
         data: _DATA,
         encodedJson : encodeURIComponent(JSON.stringify(_DATA))
    });
    console.log("home rendered")
    
  //  res.send("UNIMPLEMENTED ENDPOINT");
});	


app.get('/api/all',function(req,res){
  res.json(_DATA)
})
app.get('/create',function(req,res){
  res.render("create")
});

app.post("/api/create",function(req,res){
  var body = req.body;
  body.duration = parseInt(body.duration)
  body.difficulty = parseInt(body.difficulty)
  body.inj_potential = parseInt(body.inj_potential)
  console.log("muscle_groups: ")
  console.log(body.muscle_groups)
  body.muscle_groups = body.muscle_groups.split(" ")
  var already_added = false
  _.each(_DATA, function(i){
    if(i.name.toUpperCase() == body.name.toUpperCase()){
      already_added = true
    }
  });

  if(!already_added && body.inj_potential <=10 && body.muscle_groups.length < 10 && body.difficulty <= 10){
    _DATA.push(body)
    dataUtil.saveData(_DATA)
    console.log(_DATA)
    res.redirect('/')
  }
  else{
    res.render('already_added')
  }
});
app.get('/api/beg_exercises',function(req,res){
    var exercises =  _.filter(_DATA, function(num){
                      if (num.difficulty < 5) return num
                    }); 
    if (exercises.length == 0) return res.render("easyError");
    res.render('beg_exercises', exercises);
});

app.get('/api/most_diff',function(req,res){
  var most_difficult = []
  most_difficult.push(_DATA[0])
  _.each(_DATA,function(i){
    if(i.difficulty > most_difficult[0].difficulty){
      most_difficult.length = 0
      most_difficult.push(JSON.parse(JSON.stringify(i)))
    }
    else if((i.difficulty == most_difficult[0].difficulty)&&!most_difficult.includes(i)){
      most_difficult.push(JSON.parse(JSON.stringify(i)))
    }
    else{}
  })
  res.render('most_diff', {
    most_difficult: most_difficult,
    diff: most_difficult[0].difficulty
  })

});

app.get('/api/most_dangerous',function(req,res){
  var exercises =  _.filter(_DATA, function(num){
                      if (num.inj_potential > 6) return num
                      }); 
    if (exercises.length == 0) return res.render("dangerError");
    res.render('most_dangerous', exercises);
})

app.get('/api/cannons',function(req,res){
  var arm_exercises = []
  _.each(_DATA, function(i){
    if(i.muscle_groups.map(x=>x.toUpperCase()).some(function(z){
     return ((z == "TRICEPS") || (z == "BICEPS" )|| (z == "FOREARMS"))
                                                                })) {
      arm_exercises.push(i)
    }
  })
  if(arm_exercises.length==0) return res.render('armError');
  res.render('cannons', arm_exercises);
});

app.get('/api/quick',function(req,res){
  var quick_hard = [];
  _.each(_DATA,function(i){ 
    if(i.difficulty > 6 && i.duration < 15){
      quick_hard.push(i.name + ": Difficulty: "+ i.difficulty + " Duration: "+ i.duration)
    }
  })
  if(quick_hard.length == 0){
    res.render('quickError')
  }
  else{
    res.render('quick',{ quick_hard })
  }
})



app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
