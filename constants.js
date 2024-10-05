import * as THREE from 'three';

// Constants values for the game (not configurable by user yet):
export const GRID_SIZE = 32;
export const GAME_SPEED = 8;
export const EXPANSION_RATE = 6;
export const SNAKE_COUNT = 2; // max is 4

export function RANDOM_COLOR() {
  var h0 = Math.floor(Math.random()*16);
  var h1 = Math.floor(Math.random()*16);
  var h2 = Math.floor(Math.random()*16);
  var h3 = Math.floor(Math.random()*16);
  var h4 = Math.floor(Math.random()*16);
  var h5 = Math.floor(Math.random()*16);
  return '#' + h0.toString(16) + h1.toString(16) + h2.toString(16) + h3.toString(16) + h4.toString(16) + h5.toString(16);
}
