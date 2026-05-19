const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        trim:true,
        minlength:[2, 'name must at least 2 characters long']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength:[5, 'password must at least 6 characters long'],
        select:false
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    } 
    // timesstamps is liay use krtay hain kay ya created at or updated at kay columns automatically bna deta ha 
} , {timestamps:true} )

// if we are updating the fields (name or email) then
//  password remain hash(encrypt) only one tome
userSchema.pre('save' , async function(){
    if(!this.isModified('password')) return

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// entered password vs hash password
// here we compare the entered password by user and the hash (encrypt) password (this.password)
userSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('user',userSchema)