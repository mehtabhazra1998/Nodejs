const mongoose=require('mongoose');
const Dishes=require('./models/dishes');
const url='mongodb://localhost:27017/confusion';
const connect=mongoose.connect(url);
connect.then((db)=>{
	console.log('Connected to Server');
	Dishes.create({name:"Mehtaab Singh Hajraw",description:"New Dish"}).then((d)=>{
		console.log('Saved '+d);
		return Dishes.findByIdAndUpdate(d._id,{
			$set : {description:"Updated Dish"}
		},{
			new:true
		}).exec();
	}).then((d)=>{
		console.log('Found '+d);
		d.comments.push({
			rating:5,
			comment:"I am getting a sinking feeling",
			author:'Mehtaab Singh'
		});
		return d.save();
	}).then((dish)=>{
		console.log(dish._id);
		return Dishes.remove({});
		//return Dishes.find({});
	}).then(()=>{
		// console.log('Found '+d);
		// console.log('Closing Connection');
		return mongoose.connection.close();
	}).catch((err)=>{
		console.log(err);
		console.log('Still Closing');
		mongoose.connection.close();
	});
});
