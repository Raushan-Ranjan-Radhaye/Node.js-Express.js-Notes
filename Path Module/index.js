const express = require('express')
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))
//iska use kar ne se hamko ko pura path nahi dena hai bass folder ka naam ko mention kar na hai ye search kar ke file ka use karega (public) folder me se

app.get('/', (req,res)=>{
    const filePath = '/users/yahoobaba/docs/report.pdf'

    // console.log("BaseName:" + path.basename(filePath))// ye hamko basename yani route name return karta hai
    // console.log("DirName:" + path.dirname(filePath))// ye hamko path folder ka return kar ta hai
    // console.log("ExtName:" + path.extname(filePath))// ye hamko extension name de ta hai file ka

    // const parsed = path.parse(filePath)
    // console.log(parsed)// ye hamko object ke form me information ko return kar ta hai

    // res.send('Path Module')


//     const fullPath = path.join(__dirname,'public','images','avatar.jpg')
//     console.log(fullPath)
//    res.send("Path Module");// ye methods hamko pura path ha jo wo return kaerga



const absolute = path.resolve('public','image.jpg')
console.log(absolute)// ya methods bhi sab same hai hamko yaha par jayada code nhi kar na nahi padta hai
res.send("Path Module")
})




app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

