export interface IPresenter<Input, Output> {
  toJson: (value: Input) => Output;
}
