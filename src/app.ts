import express, { Request, Response, NextFunction } from 'express'
const app = express()
import { z } from 'zod'
const port = 3000

app.use(express.urlencoded({extended: true}))
//app.use(express.json())

/*app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})*/

app.post('/data', (req: Request, res: Response) => {
    const data = req.body.data
    console.log(req.body.data)
    res.sendStatus(200)
})

app.all('/api/all', (req: Request, res: Response) => {
    res.sendStatus(200)
})

app.route('/')
  .get((req: Request, res: Response) => {
    res.send('Get')
  })
  .post((req: Request, res: Response) => {
    res.send('post')
  })
  .delete((req: Request, res:Response) => {
    res.send('delete')
  })

app.get('/message/:message/:message2', (req: Request, res: Response) => {
    res.json({
        'message': req.params.message,
        'message2': req.params.message2
    })
})

const middleware = ({name}: {name: string}) => (req: Request, res: Response, next: NextFunction) =>  {
    //@ts-ignore
    res.locals.name = name

    next()
}

app.use(middleware({name : 'adisorn sriphongthong'}))

//next
app.get(
    '/hello',
    middleware,
    (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        res.send(res.locals.name)
        next()
    }
)

app.listen(port, () => {
    console.log('The server is running on port ' + port)
})