import { Router, Request, Response } from 'express';
import { Product } from '../model/product';
const productList: Product[] = [
    {
        id: 1,
        name: 'Bombril',
        price: 8
    },
    {
        id: 1,
        name: 'Sausage',
        price: 3
    }
]
const getAll = (req: Request, res: Response) => {
    res.status(200).send(productList);
}
export default { getAll }

// import { Request, Response } from 'express';
// import { Product } from '../model/product';
// import { connection } from '../config/db';
// import { QueryError, PoolConnection } from 'mysql2';
// const getAll = (req: Request, res: Response) => {
//     connection.getConnection((err: QueryError, conn: PoolConnection) => {
//         conn.query("select * from product", (err, resultSet: Product[]) => {
//             conn.release();
//             if (err) {
//                 res.status(500).send({
//                     message: 'INTERNAL SERVER ERROR',
//                     result: null
//                 });
//             } else {
//                 res.status(200).send({
//                     message: 'OK',
//                     result: resultSet
//                 });
//             }
//         })
//     });
// }
// export default {getAll}