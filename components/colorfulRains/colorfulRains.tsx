'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Engine, Render, Bodies, Composite, Runner, use, Body, Events } from 'matter-js';
import type { World, Body as BodyType, Vector as VectorType } from 'matter-js';
import MatterWrap from 'matter-wrap';
import sleepingCat from '@/public/images/sleepingCat.gif';
use(MatterWrap);
const BackView = () => {
  const container = useRef<HTMLCanvasElement | null>(null);
  let globalAngle = 0;
  useEffect(() => {
    const currentContainer = container.current;
    if (!currentContainer) return;
    let engine = Engine.create({ gravity: { x: 0.1, y: 10 } });
    let render = Render.create({
      canvas: currentContainer,
      engine: engine,
      options: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight - 64,
        wireframes: false,
        background: 'transparent',
      },
    });
    const rains = rainInit(render);
    const umbrella = umbrellaInit();
    Composite.add(engine.world, rains);
    Composite.add(engine.world, umbrella);
    Events.on(engine, 'afterUpdate', () => afterUpdateHandler(rains, engine.world));
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
    window.addEventListener('mousemove', (e) => mouseListener(e, engine.world));
    return () => {
      Engine.clear(engine);
      Composite.clear(engine.world, false);
      Events.off(engine, 'afterUpdate', () => afterUpdateHandler(rains, engine.world));
      window.removeEventListener('mousemove', (e) => mouseListener(e, engine.world));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const rainInit = (render: Render) => {
    const maxRainCount = 1000;
    return Array.from({ length: maxRainCount }, () => {
      const width = Math.random() * 1 + 1;
      const height = Math.random() * 20 + 10;
      const speed = Math.random() * 0.1 + 0.1;
      const axisX = Math.random() * document.documentElement.clientWidth;
      const axisY = Math.random() * document.documentElement.clientHeight;
      return Bodies.rectangle(axisX, axisY, width, height, {
        frictionAir: speed,
        mass: 10,
        restitution: 4,
        collisionFilter: {
          category: 0b00000001,
          mask: 0b00000010,
        },
        plugin: {
          wrap: {
            min: {
              x: render.bounds.min.x,
              y: render.bounds.min.y,
            },
            max: {
              x: render.bounds.max.x,
              y: render.bounds.max.y,
            },
          },
        },
      });
    });
  };
  const umbrellaInit = () => {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const vertices = [
      { x: 0, y: 0 },
      { x: 25, y: -30 },
      { x: 75, y: -60 },
      { x: 200, y: -100 },
      { x: 325, y: -60 },
      { x: 375, y: -30 },
      { x: 400, y: 0 },
    ] as unknown as VectorType[][];
    const treeBranch = Bodies.fromVertices(width / 2 + 200, height - 350, vertices, {
      collisionFilter: {
        category: 0b00000010,
        mask: 0b00000001,
      },
      isStatic: true,
      render: {
        fillStyle: '#afd7af',
      },
    });
    const treeTrunk = Bodies.rectangle(width / 2 + 200, height - 190, 50, 250, {
      collisionFilter: {
        category: 0b00000010,
        mask: 0b00000001,
      },
      isStatic: true,
      render: {
        fillStyle: '#e8cdaa',
      },
    });
    const treeComposite = Composite.create();
    Composite.add(treeComposite, [treeBranch, treeTrunk]);
    return treeComposite;
  };
  const mouseListener = (e: MouseEvent, world: World) => {
    const maxForceX = 30;
    const maxForceY = 30;
    const point = { x: e.pageX, y: e.pageY };
    const origin = { x: document.documentElement.clientWidth / 2, y: document.documentElement.clientHeight / 2 };
    const forceX = ((point.x - origin.x) * maxForceX) / origin.x;
    const forceY = ((point.y - origin.y) * maxForceY) / origin.y;
    world.gravity.x = forceX;
    world.gravity.y = forceY;
    globalAngle = changeRainAngle(point, origin);
  };
  const changeRainAngle = (point: { x: number; y: number }, origin: { x: number; y: number }) => {
    const OA = Math.abs(point.y - origin.y);
    const OB = Math.abs(point.x - origin.x);
    const AB = Math.sqrt(OA * OA + OB * OB);
    const COSO = (Math.pow(AB, 2) + Math.pow(OA, 2) - Math.pow(OB, 2)) / (2 * AB * OA);
    let angleO = Math.acos(COSO);
    if ((point.x > origin.x && point.y > origin.y) || (point.x < origin.x && point.y < origin.y)) {
      angleO = -angleO;
    }
    return angleO;
  };
  const afterUpdateHandler = (rains: BodyType[], world: World) => {
    let initY = 0;
    if (world.gravity.y < 0) initY = document.documentElement.clientHeight - 60;
    rains.forEach((r) => {
      Body.setAngle(r, globalAngle);
      if (r.position.y < 0) {
        Body.setPosition(r, {
          x: Math.random() * document.documentElement.clientWidth,
          y: initY,
        });
      }
    });
  };
  return (
    <main className=" absolute top-0 w-full h-full bg-base-bg-color">
      <div className="h-16" />
      <canvas className="w-full" ref={container}></canvas>
      <Image
        src={sleepingCat}
        alt="sleepCat"
        style={{ left: document.documentElement.clientWidth / 2 + 100 }}
        width={65}
        height={65}
        className="absolute bottom-0"
      />
      <div></div>
    </main>
  );
};

export default BackView;
