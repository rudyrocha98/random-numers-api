import express from 'express'

const app = express()
app.set("PORT", process.env.PORT || 5000)

const env = process.env.NODE_ENV

if(env === 'production'){
	app.use('/', express.static(`${__dirname}/randomevenodd-app/build`))
}

app.get("/api", (req, res) => {
	res.send("Welcome to our api.")
})

app.get("/api/random", (req, res) => {
	let number = Math.floor(Math.random()*(100-1+1)+1)
	res.json({number: number})
})

app.get("/api/random/:type", (req, res) => {
	let number = Math.floor(Math.random()*(100-1+1)+1)
	let type = req.params.type;

	if(type == "even" || type == "odd") {

		if(type=="odd"){
			if(number%2 != 1) ++number;
		}

		if(type=="even"){
			if(number%2 != 0) ++number;
		}

		res.json({number: number})
	} else {
		res.send("We don't know what is your number type. :L")
	}
})

app.listen(app.get("PORT"), ()=>{
	console.log(`API running at: localhost:${app.get("PORT")}`)
	console.log(`NODE_ENV: ${env}`)
})



