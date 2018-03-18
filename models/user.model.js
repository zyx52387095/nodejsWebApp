const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userschema = new schema({
    firstname:{
       type:String,
       required: true, /* built in validator  */
       minlength:3/* built in validator  */
   },
   lastname:{
       type:String,
       required:true,/* built in validator  */
       minlength:3, /* built in validator  */
       uppercase:true, /* schema modifier */
       validate: [stronly, 'non alpha char not allowed' ] /*custom validator. stronly is a function defined below */
   },
   studentid:{
       type: Number,
       required: true,/* built in validator  */
       unique: true, /* index */
       min:2000 /* built in validator */
   },
   notes:{
       type:String,
       maxlength:50,/* built in validator  */
       set: function(str) { /* custom setter method */
        if (str) {
            //replace word 'password' with *** goablly within the string
            return str.replace(/password/g, "***");
        }
        return str;
    }

    }
});

/* virtual attribute 'fullname'*/
userschema.virtual('fullName').
  get(function() { return this.firstname + ' ' + this.lastname; }).
  set(function(v) {
    this.firstname = v.substr(0, v.indexOf(' '));
    this.lastname = v.substr(v.indexOf(' ') + 1);
  });

  //pre hook - middelware
userschema.pre('remove', function(next){
    // we do not want to delete studentid 10000
    if (this.studentid === 10000){
        next(new Error('cannot delete studentid 10000'));
    }else{
        next();
    }
});

/* custom valiator */
function stronly(str){
   const letters = /^[A-Za-z]+$/;  //regular expresssion
   return (str.match(letters));
}

/* method that will be used as static method - without having instance of the model */
userschema.statics.findByStudentId = function findByStudentId(sid, fncallback){
    this.findOne({"studentid":sid}, fncallback);
}

/* schema instance method */
userschema.methods.tester = function(){
    console.log(this.firstname+" from instance method");
}

//'user' will relate to 'users' collection 
module.exports=mongoose.model("user", userschema);
