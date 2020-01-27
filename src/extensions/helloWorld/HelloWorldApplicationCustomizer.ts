import { override } from "@microsoft/decorators";
import {
  BaseApplicationCustomizer,
  PlaceholderName,
  PlaceholderContent
} from "@microsoft/sp-application-base";

import * as bootstrapCore from "core";

export default class HelloWorldApplicationCustomizer extends BaseApplicationCustomizer<{}> {
  private _placeholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    return super.onInit().then(async _ => {
      this.context.application.navigatedEvent.add(this, () => {
        if (!this._placeholder) {
          this._placeholder = this.context.placeholderProvider.tryCreateContent(
            PlaceholderName.Top
          );
        }

        if (this._placeholder && this._placeholder.domElement) {
          if (!bootstrapCore) {
            throw new Error("bootstrapCore is not loaded!");
          }

          bootstrapCore(this.context, this._placeholder.domElement);
        }
      });
    });
  }
}
