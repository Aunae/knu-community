export interface IAutoEditorCommand {
  command: string;
  type: 'tag' | 'execCommand';
  value: string;
}
export const autoEditorCommands: IAutoEditorCommand[] = [
  {
    command: '###&nbsp;',
    type: 'tag',
    value: 'h3',
  },
  {
    command: '##&nbsp;',
    type: 'tag',
    value: 'h2',
  },
  {
    command: '#&nbsp;',
    type: 'tag',
    value: 'h1',
  },
];
