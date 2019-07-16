import './../sass/main.sass';

import {ctx, canvas, iterations} from './init';
import { setKeyboardSettings, setCursorSettings, framesPassedFunctions, fps, nextGameStep } from './functions';
import {drawSpace, drawBorder} from './drawStatic'
import {mainShip} from './ships-proto'
import {drawShips} from './ships'
import {drawShoots} from './shoots'
import {drawMiniMap} from './minimap'

// При загрузке создаем изображения
window.addEventListener("load", gameLoop())


function gameLoop() {

	ctx.clearRect(0 , 0, canvas.width, canvas.height);

	// Получаем активные клавиши и информацию о курсоре
	setKeyboardSettings();

	setCursorSettings();

	// По большей частности используется для оптимизации. ТК вовсе незачем все действия выполнять 60 раз в секунду - вводит различные счетчики и прочие приемы оптимизации
	framesPassedFunctions();

	//Рисуем звезды на фоне
	drawSpace();

	// Рисует остальной canvas относительно игрока
	ctx.save();
	ctx.translate(-mainShip.x + canvas.width/2, -mainShip.y + canvas.height/2);

  	drawBorder();
	drawShoots();
	drawShips();
	

	ctx.restore();

	
	// Рисует все статические элементы поверх всего остального
	drawMiniMap();
	fps();

	// Следующий кадр
	nextGameStep(gameLoop);
}
