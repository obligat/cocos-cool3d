import {
  _decorator,
  CCInteger,
  Component,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
  RigidBody,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerMovement")
export class PlayerMovement extends Component {
  @property
  speed: number;

  @property(RigidBody)
  rigidBody: RigidBody;

  @property
  forwardForce: number = 0;

  @property
  sideForce: number = 0;

  isLeftDown: boolean = false;
  isRightDown: boolean = false;

  start() {
    // let force = new Vec3(0, 0, 500);
    // this.rigidBody.applyForce(force);

    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  update(deltaTime: number) {
    let force = new Vec3(0, 0, this.forwardForce * deltaTime);
    this.rigidBody.applyForce(force);

    if (this.isLeftDown) {
      let leftForce = new Vec3(this.sideForce * deltaTime, 0, 0);
      this.rigidBody.applyForce(leftForce);
    }

    if (this.isRightDown) {
      let rightForce = new Vec3(-this.sideForce * deltaTime, 0, 0);
      this.rigidBody.applyForce(rightForce);
    }
  }

  protected onDestroy(): void {
      input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
      input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    if (event.keyCode === KeyCode.KEY_A) {
      this.isLeftDown = true;
    }

    if (event.keyCode === KeyCode.KEY_D) {
      this.isRightDown = true;
    }
  }

  onKeyUp(event: EventKeyboard) {
    if (event.keyCode === KeyCode.KEY_A) {
      this.isLeftDown = false;
    }

    if (event.keyCode === KeyCode.KEY_D) {
      this.isRightDown = false;
    }
  }
}
