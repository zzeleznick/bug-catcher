import {
  CollisionGroupManager,
  CollisionGroup,
} from "https://esm.sh/excalibur@0.26.0-alpha.264";

export const _bugGroup = CollisionGroupManager.create('bug')
export const _playerGroup = CollisionGroupManager.create('player')
export const floorGroup = CollisionGroupManager.create('floor')

export const bugGroup = CollisionGroup.collidesWith([
    _playerGroup,
]);

export const playerGroup = CollisionGroup.collidesWith([
    _bugGroup,
]);
