import { _decorator, BoxCollider, Component, ICollisionEvent, Node } from "cc";
import { PlayerMovement } from "./PlayerMovement";
const { ccclass, property } = _decorator;

@ccclass("PlayerCollision")
export class PlayerCollision extends Component {
  start() {
    let collider = this.node.getComponent(BoxCollider);

    collider.on('onCollisionEnter', this.onCollisionEnter, this)

  }

  protected onDestroy(): void {
      let collider = this.node.getComponent(BoxCollider);
      collider.off('onCollisionEnter', this.onCollisionEnter, this)
  }

  onCollisionEnter(event: ICollisionEvent){
    if (event.otherCollider.node.name === 'Obstacle') {
        let movement = this.node.getComponent(PlayerMovement);
        movement.enabled = false;
    }
  }

  update(deltaTime: number) {}
}
