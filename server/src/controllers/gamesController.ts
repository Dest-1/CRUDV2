import { Request, Response } from 'express';


import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM games', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne (req:Request,res:Response):Promise<any>{
        const {id} = req.params;
        await pool.query('SELECT * FROM games where id=?',[id], function(err, result, fields) {
             if (err) throw err;
             if(result.length > 0){
             return res.json(result[0]);
         }
         res.status(404).json({text: "El juego no existe"});
         });
          }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO games set ?', [req.body]);
        res.json({ message: 'El juego ha sido guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldGame = req.body;
        await pool.query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "El juego ha sido actualizo" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({ message: "El juego ha sido eliminado" });
    }
}

const gamesController = new GamesController;
export default gamesController;