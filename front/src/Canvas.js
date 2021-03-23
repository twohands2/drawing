import React, { createRef, useEffect } from 'react';

/*
 * Drawing
 *
 * -> 캔버스에 마우스 클릭 후 드래시 그려진다.
 * -> & pos변수를 useState를 사용하여 useEffect와 같이 쓰려고 했으나 setDrawable, setX, setY시 변수의 값이 업데이트 되지않음.
 */
const Canvas = () => {

    let ctx;                     //ctx : canvas context object
    let canvas;                  //canvas : canvas object
    let canvasRef = createRef(); //canvasRef : canvas reference object

    /*
     * mouse pointer object
     * -> drawable(캔버스에 그려질지 여부) : true/false
     * -> X(x좌표) : ?
     * -> Y(y좌표) : ?
     */
    let pos = {
        drawable : false
        , X : -1
        , Y : -1
    }

    /*
     * initDraw : 그리기 시작시
     * -> parameter : e(mouse event)
     */
    const initDraw = (e) => {
        // console.log('initDraw');
        ctx.beginPath();
        pos = {
            drawable : true
            , X : e.offsetX
            , Y : e.offsetY
        }

        ctx.moveTo(pos.X, pos.Y);
    }

    /*
     * toDraw : 그리기 실행중
     * -> parameter : e(mouse event)
     */
    const toDraw = (e) => {
        // console.log('toDraw : ', drawable);
        if(pos.drawable){
            pos = {
                drawable : true
                , X : e.offsetX
                , Y : e.offsetY
            }
            ctx.lineTo(pos.X, pos.Y);
            ctx.stroke();
        }
    }

    /*
     * finishDraw : 그리기 마무리
     * -> parameter : e(mouse event)
     */
    const finishDraw = (e) => {
        // console.log('finishDraw');
        pos = {
            drawable : false
            , X : -1
            , Y : -1
        }
    }

    /*
     * setColor : 캔버스에 그릴 색을 설정
     * -> parameter : e(button object) 
     */
    const setColor = (e) => {
        // console.log(e.target.value);
        ctx.strokeStyle = e.target.value;
    }

    /*
     * setClear : 캔버스를 clear 시킴. 
     */
    const setClear = () => {
        ctx.clearRect(-1, -1, 500, 500);
    }

    /*
     * useEffect(event 추가 및 캔버스 2d객체 가져오기?)
     * -> mousedown(마우스 누를시)          : initDraw 추가
     * -> mousemove(마우스 움직일시)        : toDraw 추가
     * -> mouseup(마우스 누른 후)           : finishDraw 추가
     * -> mouseout(마우스가 캔버스에서 나갈시) : finishDraw 추가
     */
    useEffect(() => {
        canvas = canvasRef.current;
        canvas.width = 500;
        canvas.heigth = 500;

        ctx = canvas.getContext('2d');
        //테투리라인 및 채우기색 추가 필요
        // ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, 500, 500);

        canvas.addEventListener('mousedown', initDraw);
        canvas.addEventListener('mousemove', toDraw);
        canvas.addEventListener('mouseup', finishDraw);
        canvas.addEventListener('mouseout', finishDraw);
    }, []);

    return (
        <div>
            <button onClick={ setClear }>지우기</button>
            <button onClick={(e) => { setColor(e) }} value="black">검정</button>
            <button onClick={(e) => { setColor(e) }} value="blue">파랑</button>
            <canvas ref={canvasRef} width="500" height="500"></canvas>
        </div>
    );
};

export default Canvas;