import { Router } from 'express';
import { gamelist, createTemplateGame, packageGame } from '../controller/game.controller';
import auth from '../config/auth';

const gameRouter = Router();

// Check if the given room code is associated with a game currently
gameRouter.get('/:room/status', (req, res) => {
    if (req.params.room in gamelist) {
        res.send(true);
    } else {
        res.send(false);
    }
});

// Get game information for the whole room
gameRouter.get('/:room/info', (req, res) => {
    const room = req.params.room;
    if (room in gamelist) {
        res.send(packageGame(gamelist[room]));
    } else {
        res.status(404).send({
            message: 'INVALID ROOM CODE'
        });
    }
});

// Create new game object
gameRouter.get('/create', auth.authenticateToken, (req, res) => {
    const pid = +(req as any).user;
    const game = createTemplateGame(pid);
    console.log(`Game created for room ${game.room} by ${pid}`)
    res.send(packageGame(game));
    
});

export default gameRouter;